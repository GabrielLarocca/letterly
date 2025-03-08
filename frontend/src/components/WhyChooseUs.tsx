import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const WhyChooseUs = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Crie memórias que duram para sempre</h2>
            <p className="text-gray-600 leading-relaxed">
              No mundo digital de hoje, uma carta cuidadosamente criada se destaca mais do que nunca. Nossa plataforma ajuda você a criar mensagens belas e significativas que combinam o encanto tradicional das cartas com elementos multimídia modernos.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-gray-800">Modelos personalizados para cada ocasião</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-gray-800">Adicione fotos, música e efeitos especiais</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-gray-800">Opções fáceis de compartilhar</span>
              </li>
            </ul>
            <Button 
              onClick={() => navigate("/create")}
              className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300"
            >
              Comece a escrever
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent to-primary/50 opacity-90 transform rotate-3" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Letter writing illustration" 
                className="w-3/4 h-3/4 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};