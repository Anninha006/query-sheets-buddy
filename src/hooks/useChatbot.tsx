import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente analítico de vendas. Configure suas credenciais do Google Sheets primeiro, depois pode me fazer perguntas sobre seus dados de vendas, como:\n\n• Qual foi o produto mais vendido no terceiro trimestre?\n• Qual a variação percentual de receita entre janeiro e dezembro?\n• Quais são os top 5 produtos por faturamento?\n• Como está a performance de vendas por região?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [salesData, setSalesData] = useState<any[]>([]);
  const { toast } = useToast();

  const loadSalesData = async () => {
    const apiKey = localStorage.getItem("google_api_key");
    const spreadsheetId = localStorage.getItem("spreadsheet_id");

    if (!apiKey || !spreadsheetId) {
      toast({
        title: "Configuração necessária",
        description: "Por favor, configure suas credenciais primeiro",
        variant: "destructive",
      });
      return false;
    }

    try {
      setIsLoading(true);
      console.log("Buscando dados do Google Sheets...");

      const { data, error } = await supabase.functions.invoke("fetch-sheets-data", {
        body: { apiKey, spreadsheetId },
      });

      if (error) throw error;

      if (data.success && data.data) {
        setSalesData(data.data);
        console.log(`${data.recordCount} registros carregados`);
        
        toast({
          title: "Dados carregados",
          description: `${data.recordCount} registros de vendas importados com sucesso`,
        });
        
        return true;
      } else {
        throw new Error(data.error || "Erro ao carregar dados");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast({
        title: "Erro ao carregar dados",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log("Enviando mensagem para o chatbot...");

      const { data, error } = await supabase.functions.invoke("chat-analytics", {
        body: { 
          messages: [...messages, userMessage],
          salesData: salesData.length > 0 ? salesData : null,
        },
      });

      if (error) throw error;

      if (data.success && data.message) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.message,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "Erro ao processar resposta");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      
      const errorMessage: Message = {
        role: "assistant",
        content: `Desculpe, ocorreu um erro: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`,
      };
      setMessages((prev) => [...prev, errorMessage]);

      toast({
        title: "Erro",
        description: "Não foi possível processar sua mensagem",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    salesData,
    sendMessage,
    loadSalesData,
  };
};
