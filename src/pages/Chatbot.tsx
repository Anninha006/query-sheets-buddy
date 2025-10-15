import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ConfigPanel } from "@/components/ConfigPanel";
import { useChatbot } from "@/hooks/useChatbot";
import { ScrollArea } from "@/components/ui/scroll-area";

const Chatbot = () => {
  const navigate = useNavigate();
  const [showConfig, setShowConfig] = useState(false);
  const { messages, isLoading, salesData, sendMessage, loadSalesData } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={loadSalesData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowConfig(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-2xl border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 border-b border-border">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Chatbot Analítico</h1>
            <p className="text-sm text-muted-foreground">
              {salesData.length > 0 
                ? `${salesData.length} registros carregados • Pronto para análises`
                : "Configure suas credenciais para começar"}
            </p>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)] md:h-[500px]">
            <div className="p-6 space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <div className="flex gap-3 p-4 rounded-lg bg-secondary/20">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary/50 rounded w-1/4 animate-pulse" />
                    <div className="h-4 bg-secondary/50 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-6 border-t border-border bg-background/50">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>

      <ConfigPanel isOpen={showConfig} onClose={() => setShowConfig(false)} />
    </div>
  );
};

export default Chatbot;
