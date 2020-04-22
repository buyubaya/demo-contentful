import { useEffect } from 'react';
import { useFocus } from './useFocus';

/**
 * This works with the useFocus hook to reload the page if data has changed.
 * It works by fetching the current page async, and comparing the X-Version
 * header to the current one (passed in as pageDataHash)
 */
export function useFocusReload(pageDataHash) {
  const focused = useFocus();

  useEffect(() => {
    async function handleFocus() {
      if (focused) {
        const res = await fetch(window.location.href, {
          headers: {
            pragma: 'no-cache',
          },
        });

        if (res.ok && res.headers.get('X-version') !== pageDataHash) {
          // window.location.reload();
          console.log('DATA CHANGED! REFRESH NOW!')
        }
      }
    }

    handleFocus();
  }, [focused]);
}