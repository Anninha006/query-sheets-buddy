import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, salesData } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    // Preparar o contexto com os dados de vendas
    const dataContext = salesData && salesData.length > 0 
      ? `\n\nDados de vendas disponíveis (${salesData.length} registros):\n${JSON.stringify(salesData.slice(0, 100), null, 2)}`
      : "\n\nNenhum dado de vendas disponível ainda. Informe ao usuário que precisa configurar as credenciais.";

    const systemPrompt = `Você é um assistente analítico especializado em análise de dados de vendas. 
Você tem acesso aos dados de vendas de 12 meses do ano.

Suas responsabilidades:
- Responder perguntas sobre vendas, produtos, receitas e métricas
- Fornecer análises quantitativas baseadas nos dados fornecidos
- Calcular totais, médias, porcentagens e variações
- Identificar tendências e padrões nos dados
- Sempre citar números específicos quando disponíveis

${dataContext}

Quando responder:
- Seja preciso e baseie suas respostas nos dados
- Use formatação clara com números e porcentagens
- Se os dados não estiverem disponíveis, informe claramente
- Sugira perguntas relacionadas que podem ser respondidas com os dados disponíveis`;

    console.log("Enviando requisição para Lovable AI...");
    console.log("Mensagens:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro da API:", response.status, errorText);
      
      if (response.status === 429) {
        throw new Error("Limite de requisições excedido. Tente novamente em alguns instantes.");
      }
      if (response.status === 402) {
        throw new Error("Créditos insuficientes. Adicione créditos ao seu workspace.");
      }
      
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    console.log("Resposta recebida da IA");

    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("Resposta vazia da IA");
    }

    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Erro no chat:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Erro desconhecido",
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
