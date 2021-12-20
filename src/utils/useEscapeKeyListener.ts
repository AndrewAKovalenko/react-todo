import {useEffect} from 'react';

export const useEscapeKeyListener = (callback: () => void, targetElement?: HTMLElement | null) => {
  const enterKeyListener = (event: KeyboardEvent) => event.key === 'Escape' && callback();

  useEffect(() => {
    if (targetElement) {
      targetElement.addEventListener('keydown', enterKeyListener);
      return () => targetElement.removeEventListener('keydown', enterKeyListener);
    }

    document.addEventListener('keydown', enterKeyListener);
    return () => document.removeEventListener('keydown', enterKeyListener);
  }, []);
}
