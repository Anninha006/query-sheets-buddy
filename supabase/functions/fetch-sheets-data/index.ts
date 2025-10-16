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
    const { apiKey, folderId } = await req.json();

    if (!apiKey || !folderId) {
      throw new Error("API Key e Folder ID são obrigatórios");
    }

    // Buscar todos os arquivos do Google Sheets na pasta
    const driveUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/vnd.google-apps.spreadsheet'&key=${apiKey}`;
    
    console.log('Buscando planilhas na pasta...');
    const driveResponse = await fetch(driveUrl);
    
    if (!driveResponse.ok) {
      const error = await driveResponse.text();
      throw new Error(`Erro ao acessar pasta do Drive: ${error}`);
    }

    const driveData = await driveResponse.json();
    const spreadsheets = driveData.files || [];
    
    console.log(`${spreadsheets.length} planilhas encontradas`);

    const allData: any[] = [];

    // Para cada planilha encontrada
    for (const sheet of spreadsheets) {
      const spreadsheetId = sheet.id;
      const spreadsheetName = sheet.name;
      
      console.log(`Processando: ${spreadsheetName}`);
      
      // Buscar metadados da planilha para descobrir as abas
      const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;
      const metadataResponse = await fetch(metadataUrl);
      
      if (!metadataResponse.ok) {
        console.error(`Erro ao buscar metadados de ${spreadsheetName}`);
        continue;
      }
      
      const metadata = await metadataResponse.json();
      const sheetNames = metadata.sheets?.map((s: any) => s.properties.title) || [];
      
      // Buscar dados de cada aba
      for (const sheetName of sheetNames) {
        const range = `${sheetName}!A:Z`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error(`Erro ao buscar ${sheetName} de ${spreadsheetName}`);
          continue;
        }

        const data = await response.json();
        
        if (data.values && data.values.length > 0) {
          const headers = data.values[0];
          const rows = data.values.slice(1);
          
          const sheetData = rows.map((row: any[]) => {
            const obj: any = { 
              planilha: spreadsheetName,
              aba: sheetName
            };
            headers.forEach((header: string, index: number) => {
              obj[header] = row[index] || '';
            });
            return obj;
          });
          
          allData.push(...sheetData);
        }
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
