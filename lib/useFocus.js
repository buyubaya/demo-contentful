import { useState, useEffect } from 'react';

/**
 * Hook that returns true if the window is focused and
 * false if not.
 */
export function useFocus() {
  const [state, setState] = useState(null);

  const onFocusEvent = () => setState(true);
  const onBlurEvent = () => setState(false);

  useEffect(() => {
    window.addEventListener('focus', onFocusEvent);
    window.addEventListener('blur', onBlurEvent);

    return () => {
      window.removeEventListener('focus', onFocusEvent);
      window.removeEventListener('blur', onBlurEvent);
    };
  });

  return state;
}