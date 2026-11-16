import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top on navigation, or to the hash target when one is present. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
