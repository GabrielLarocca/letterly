// Configurações e utilitários de acessibilidade

/**
 * Verifica se o usuário prefere movimento reduzido
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Verifica se o usuário está usando um leitor de tela
 * Nota: Esta é uma detecção heurística e não é 100% confiável
 */
export function isUsingScreenReader(): boolean {
  return document.documentElement.getAttribute('data-using-screen-reader') === 'true';
}

/**
 * Configura a detecção de leitor de tela
 * Deve ser chamado na inicialização da aplicação
 */
export function setupAccessibilityDetection(): void {
  // Detectar uso de teclado como possível indicador de leitor de tela
  let usingKeyboard = false;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      usingKeyboard = true;
      document.documentElement.setAttribute('data-using-keyboard', 'true');
    }
  });
  
  document.addEventListener('mousedown', () => {
    if (usingKeyboard) {
      usingKeyboard = false;
      document.documentElement.setAttribute('data-using-keyboard', 'false');
    }
  });
  
  // Adicionar classe para estilos de foco visíveis
  document.documentElement.classList.add('focus-visible-enabled');
}

/**
 * Anuncia uma mensagem para leitores de tela
 */
export function announceForScreenReader(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
  const announcer = document.getElementById(`a11y-announcer-${politeness}`);
  
  if (!announcer) {
    const newAnnouncer = document.createElement('div');
    newAnnouncer.id = `a11y-announcer-${politeness}`;
    newAnnouncer.setAttribute('aria-live', politeness);
    newAnnouncer.setAttribute('aria-atomic', 'true');
    newAnnouncer.classList.add('sr-only');
    document.body.appendChild(newAnnouncer);
    
    // Pequeno atraso para garantir que o leitor de tela detecte a mudança
    setTimeout(() => {
      newAnnouncer.textContent = message;
    }, 50);
  } else {
    announcer.textContent = '';
    
    // Pequeno atraso para garantir que o leitor de tela detecte a mudança
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }
} 