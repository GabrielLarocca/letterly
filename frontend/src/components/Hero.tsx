import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fade-in relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 -z-10" />

      <h1 className="text-4xl md:text-6xl font-bold text-center text-secondary mb-6 animate-slide-up">
        Crie uma carta personalizada com fotos<br/> e compartilhe com seus amigos
      </h1>
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-8 animate-slide-up delay-100">
        Crie mensagens personalizadas com fotos e compartilhe com seus amigos. Crie memórias que duram para sempre.
      </p>
      <div className="flex gap-4 animate-slide-up delay-200">
        <Button
          onClick={() => navigate("/create")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
        >
          Crie sua carta!
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};
