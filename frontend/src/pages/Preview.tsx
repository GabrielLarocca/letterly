import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import YouTube from "react-youtube";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Share2, Download, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface PreviewProps {
  title?: string;
  message?: string;
  emoji?: string;
  images?: string[];
  musicUrl?: string;
}

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (location.state) {
      setData(location.state);
      
      // Extrair ID do vídeo do YouTube se houver URL
      if (location.state.musicUrl) {
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = location.state.musicUrl.match(youtubeRegex);
        if (match && match[1]) {
          setVideoId(match[1]);
        }
      }
    } else {
      // Se não houver dados, redirecionar para a página de criação
      navigate("/create");
    }
  }, [location.state, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data?.title || "Minha Carta Digital",
        text: "Confira esta carta digital que criei!",
        url: window.location.href,
      })
      .then(() => toast.success("Compartilhado com sucesso!"))
      .catch((error) => console.error("Erro ao compartilhar:", error));
    } else {
      // Fallback para navegadores que não suportam a API Web Share
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success("Link copiado para a área de transferência!"))
        .catch(() => toast.error("Não foi possível copiar o link"));
    }
  };

  const handleDownload = () => {
    // Simulação de download - em um caso real, você geraria um PDF ou imagem
    toast.success("Sua carta foi baixada!");
  };

  if (!data) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>

      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">{data.title}</h1>
          
          {data.images && data.images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-8 whitespace-pre-line text-lg">
            {data.message}
            {data.emoji && <span className="text-2xl ml-2">{data.emoji}</span>}
          </div>
          
          {videoId && (
            <div className="mb-8">
              <YouTube
                videoId={videoId}
                className="w-full"
                opts={{
                  height: "315",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 1,
                  },
                }}
              />
            </div>
          )}
          
          <div className="flex justify-center gap-4">
            <Button onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Compartilhar
            </Button>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Baixar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Preview;