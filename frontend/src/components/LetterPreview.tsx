import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmojiRain } from './EmojiRain';
import { ImageCarousel } from './ImageCarousel';

interface LetterPreviewProps {
  title: string;
  message: string;
  emoji: string;
  images: string[];
  musicUrl?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function LetterPreview({ 
  title, 
  message, 
  emoji, 
  images, 
  musicUrl,
  onConfirm,
  onCancel
}: LetterPreviewProps) {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  // Iniciar música
  useEffect(() => {
    if (musicUrl) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(err => console.error("Erro ao reproduzir música:", err));
      setAudioElement(audio);
      
      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, [musicUrl]);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto relative">
        {emoji && <EmojiRain emoji={emoji} active={true} />}
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
          
          {images.length > 0 && <ImageCarousel images={images} />}
          
          <div className="whitespace-pre-line mb-8 text-lg">
            {message}
            {emoji && <span className="text-2xl ml-2">{emoji}</span>}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onCancel}>
              Voltar e Editar
            </Button>
            <Button onClick={onConfirm}>
              Confirmar e Enviar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
} 