import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigPanel = ({ isOpen, onClose }: ConfigPanelProps) => {
  const [apiKey, setApiKey] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Carregar configurações do localStorage
    const savedApiKey = localStorage.getItem("google_api_key");
    const savedSpreadsheetId = localStorage.getItem("spreadsheet_id");
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedSpreadsheetId) setSpreadsheetId(savedSpreadsheetId);
  }, []);

  const handleSave = () => {
    if (!apiKey || !spreadsheetId) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("google_api_key", apiKey);
    localStorage.setItem("spreadsheet_id", spreadsheetId);
    
    toast({
      title: "Configurações salvas",
      description: "Suas credenciais foram armazenadas com sucesso",
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações
          </CardTitle>
          <CardDescription>
            Configure suas credenciais para acessar o Google Sheets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Google API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Cole sua API Key do Google Cloud"
            />
            <p className="text-xs text-muted-foreground">
              Obtenha em: Google Cloud Console → APIs & Services → Credentials
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="spreadsheet-id">ID da Planilha</Label>
            <Input
              id="spreadsheet-id"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              placeholder="ID da planilha do Google Sheets"
            />
            <p className="text-xs text-muted-foreground">
              Encontre na URL: docs.google.com/spreadsheets/d/[ID]/edit
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
