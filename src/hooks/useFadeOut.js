import { useEffect } from 'react';

export function useFadeOut(ref, duration, isVisible) {
  useEffect(() => {
    if (!ref.current) return;
    if (isVisible) {
      ref.current.style.opacity = 1;
    } else {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        ref.current.style.opacity = 1 - progress;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isVisible, duration, ref]);
}
