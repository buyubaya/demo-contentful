import { useEffect } from 'react';
import { useFocus } from './useFocus';

/**
 * This works with the useFocus hook to reload the page if data has changed.
 * It works by fetching the current page async, and comparing the X-Version
 * header to the current one (passed in as pageDataHash)
 */
export function useFocusReload(pageDataHash, callback) {
  const focused = useFocus();

  useEffect(() => {
    async function handleFocus() {
      if (focused) {
        const res = await fetch(window.location, {
          headers: {
            pragma: 'no-cache',
          },
        });

        if (res.ok) {
          const resText = await res.text();
          const reg = /(?<=<script id="__NEXT_DATA__" type="application\/json">)([^<>]*)(?=<\/script>)/gmi;
          const __NEXT_DATA__JSON = JSON.parse(resText.match(reg)[0]);
          const prevPageDataHash = __NEXT_DATA__JSON.props.pageProps.pageDataHash;

          if (prevPageDataHash !== pageDataHash) {
            if (callback) {
              callback({
                previous: __NEXT_DATA__JSON,
                current: pageDataHash,
              });
            }
          }
        }

        // if (res.ok && res.headers.get('X-version') !== pageDataHash) {
        //   if (callback) {
        //     callback({
        //       previous: __NEXT_DATA__JSON,
        //       current: pageDataHash,
        //     });
        //   }
        // }
      }
    }

    handleFocus();
  }, [focused]);
}