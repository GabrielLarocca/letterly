import { useEffect, useRef, useState } from 'react';

interface EmojiRainProps {
  emoji: string;
  active: boolean;
}

export function EmojiRain({ emoji, active }: EmojiRainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  
  // Garantir que a chuva seja ativada
  useEffect(() => {
    if (active) {
      setIsActive(true);
    }
  }, [active]);
  
  useEffect(() => {
    if (!isActive || !emoji || !containerRef.current) return;
    
    console.log("Iniciando chuva de emojis:", emoji);
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight || 500; // Altura mínima se não for possível determinar
    
    // Limpar emojis existentes
    container.innerHTML = '';
    
    // Criar emojis
    const createEmoji = () => {
      if (!containerRef.current) return;
      
      const emojiElement = document.createElement('div');
      emojiElement.textContent = emoji;
      emojiElement.style.position = 'absolute';
      emojiElement.style.fontSize = `${Math.random() * 20 + 10}px`;
      emojiElement.style.left = `${Math.random() * containerWidth}px`;
      emojiElement.style.top = '-20px';
      emojiElement.style.opacity = '1';
      emojiElement.style.transition = 'top 3s linear, opacity 3s linear';
      emojiElement.style.zIndex = '100';
      emojiElement.style.pointerEvents = 'none';
      
      container.appendChild(emojiElement);
      
      // Animar queda
      setTimeout(() => {
        emojiElement.style.top = `${containerHeight + 20}px`;
        emojiElement.style.opacity = '0';
      }, 10);
      
      // Remover após animação
      setTimeout(() => {
        emojiElement.remove();
      }, 3000);
    };
    
    // Criar emojis iniciais
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createEmoji(), i * 100);
    }
    
    // Criar emojis periodicamente
    const interval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        createEmoji();
      }
    }, 300);
    
    return () => {
      clearInterval(interval);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [emoji, isActive]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-50"
      style={{ 
        pointerEvents: 'none',
        minHeight: '500px'
      }}
    />
  );
} 