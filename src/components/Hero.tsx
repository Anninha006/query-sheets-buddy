import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, TrendingUp, Brain, BarChart3, Zap } from "lucide-react";
import heroImage from "@/assets/hero-analytics.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iaHNsKDIxNyA5MSUgMzUlIC8gMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        
        <div className="container relative mx-auto px-4 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Inteligência Artificial para Vendas</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Bot Analítico de
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Vendas</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Consulte seus dados em linguagem natural e obtenha insights instantâneos sobre suas vendas. 
                Libere sua equipe para focar no que realmente importa: estratégias de crescimento.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all"
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeE64tnmaq9uBgyILTg7RgGoc8XSu3OZbzk26F_FmPDLZ6TDQ/viewform', '_blank')}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Preencher Formulário
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
                  onClick={() => window.location.href = '/chatbot'}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Acessar Chatbot
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:block hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Analytics Dashboard" 
                className="relative rounded-3xl shadow-2xl border border-primary/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Transforme Dados em <span className="text-accent">Decisões</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Perguntas complexas, respostas simples e instantâneas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 rounded-2xl bg-card hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Linguagem Natural</h3>
            <p className="text-muted-foreground">
              Faça perguntas como: "Qual foi o produto mais vendido no Q3?" e receba respostas instantâneas
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-card hover:shadow-xl transition-all duration-300 border border-border hover:border-accent/30">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Relatórios Automáticos</h3>
            <p className="text-muted-foreground">
              Análises completas e comparações entre períodos geradas automaticamente
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-card hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Insights Inteligentes</h3>
            <p className="text-muted-foreground">
              Identifique tendências, padrões e oportunidades de crescimento com IA
            </p>
          </div>
        </div>
      </section>

      {/* Example Questions Section */}
      <section className="container mx-auto px-4 pb-32">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12 border border-primary/10">
          <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
            Exemplos de Perguntas que Você Pode Fazer
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Qual foi o produto mais vendido no terceiro trimestre?",
              "Qual a variação percentual de receita entre janeiro e dezembro?",
              "Quais categorias tiveram maior crescimento este ano?",
              "Compare as vendas do primeiro semestre com o segundo",
            ].map((question, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
