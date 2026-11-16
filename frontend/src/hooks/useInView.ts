import { useEffect, useRef, useState, type RefObject } from 'react';

const DEFAULT_THRESHOLD = 0.05;

/**
 * Reports when an element first enters the viewport (one-shot).
 * Falls back to "visible" where IntersectionObserver is unavailable.
 */
export function useInView<T extends Element>(threshold = DEFAULT_THRESHOLD): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
