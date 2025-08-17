
import { useEffect } from 'react';

interface TiltOptions {
  max: number;
  speed: number;
  glare: boolean;
  'max-glare': number;
}

declare global {
  interface Window {
    VanillaTilt: {
      init: (elements: HTMLElement[], options?: TiltOptions) => void;
    };
  }
}

const TiltScript = () => {
  useEffect(() => {
    // Load VanillaTilt script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.VanillaTilt) {
        // Initialize on elements with data-tilt attribute
        const tiltElements = document.querySelectorAll('[data-tilt]');
        window.VanillaTilt.init(tiltElements as unknown as HTMLElement[], {
          max: 8,
          speed: 400,
          glare: true,
          'max-glare': 0.3,
        });
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TiltScript;
