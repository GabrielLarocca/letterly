import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { EmojiRain } from './EmojiRain';
import { ImageCarousel } from './ImageCarousel';

interface LetterExampleProps {
  title: string;
  message: string;
  emoji: string;
  images: string[];
}

export function LetterExample({ 
  title, 
  message, 
  emoji, 
  images
}: LetterExampleProps) {
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  
  // Ativar chuva de emojis quando o componente montar
  useEffect(() => {
    setShowEmojiRain(true);
  }, []);
  
  return (
    <Card className="w-full overflow-hidden relative">
      {emoji && <EmojiRain emoji={emoji} active={showEmojiRain} />}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
        
        {images.length > 0 && <ImageCarousel images={images} />}
        
        <div className="whitespace-pre-line text-sm">
          {message}
          {emoji && <span className="text-xl ml-2">{emoji}</span>}
        </div>
      </div>
    </Card>
  );
} 