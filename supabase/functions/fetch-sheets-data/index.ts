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
    const { apiKey, spreadsheetId } = await req.json();

    if (!apiKey || !spreadsheetId) {
      throw new Error("API Key e Spreadsheet ID são obrigatórios");
    }

    // Buscar todas as 12 planilhas (assumindo que são abas de Janeiro a Dezembro)
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const allData: any[] = [];

    for (const month of months) {
      const range = `${month}!A:Z`; // Pega todas as colunas da aba
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
      
      console.log(`Buscando dados de ${month}...`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const error = await response.text();
        console.error(`Erro ao buscar ${month}:`, error);
        continue; // Continua com os outros meses mesmo se um falhar
      }

      const data = await response.json();
      
      if (data.values && data.values.length > 0) {
        // Primeira linha contém os cabeçalhos
        const headers = data.values[0];
        const rows = data.values.slice(1);
        
        // Converter para objetos
        const monthData = rows.map((row: any[]) => {
          const obj: any = { mes: month };
          headers.forEach((header: string, index: number) => {
            obj[header] = row[index] || '';
          });
          return obj;
        });
        
        allData.push(...monthData);
      }
    }

    console.log(`Total de registros coletados: ${allData.length}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: allData,
        recordCount: allData.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Erro na function:", error);
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
