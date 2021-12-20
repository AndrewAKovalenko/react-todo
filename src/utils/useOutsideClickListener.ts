import {MutableRefObject, useEffect} from 'react';

export const useOutsideClickListener = (
  elementRef: MutableRefObject<HTMLElement | null>,
  callback: () => void
) => {
  const outsideClickListener = (event: MouseEvent) => {
    return event.target instanceof HTMLElement
      && !elementRef.current?.contains(event.target)
      && callback();
  }

  useEffect(() => {
    document.addEventListener('click', outsideClickListener);
    return () => document.removeEventListener('click', outsideClickListener);
  }, []);
}
