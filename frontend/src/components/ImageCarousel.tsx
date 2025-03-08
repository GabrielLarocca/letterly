import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
  images: string[];
  /** Descrições alternativas para cada imagem */
  imageAlts?: string[];
}

export function ImageCarousel({ images, imageAlts = [] }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  if (images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Obter descrição alternativa para a imagem atual
  const getAltText = (index: number) => {
    return imageAlts[index] || `Imagem ${index + 1} de ${images.length}`;
  };

  return (
    <div 
      className="relative w-full h-80 mb-6"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Galeria de imagens"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={images[currentIndex]} 
          alt={getAltText(currentIndex)} 
          className="max-w-full max-h-full object-contain rounded-md"
        />
      </div>
      
      {images.length > 1 && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
            onClick={goToPrevious}
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full"
            onClick={goToNext}
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div 
            className="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
            role="tablist"
            aria-label="Seleção de imagens"
          >
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para imagem ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
          
          <div className="sr-only" aria-live="polite">
            Imagem {currentIndex + 1} de {images.length}: {getAltText(currentIndex)}
          </div>
        </>
      )}
    </div>
  );
} 