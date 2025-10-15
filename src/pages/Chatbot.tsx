import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 p-8">
      <div className="container mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-3xl shadow-2xl border border-border p-8">
            <h1 className="text-3xl font-bold mb-4">Chatbot Analítico</h1>
            <p className="text-muted-foreground mb-8">
              Em breve: Interface de conversação com IA para análise de dados de vendas.
            </p>
            
            <div className="h-[500px] bg-muted/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
              <p className="text-muted-foreground">Interface do chatbot será implementada aqui</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
