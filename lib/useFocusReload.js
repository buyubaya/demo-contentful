import { useEffect } from 'react';
import { useFocus } from './useFocus';


const client = require('contentful').createClient({
  space: "rpawvh52ui6g",
  accessToken: "OLRHxqJs-ydHv9blPC-rFPk3BzREGcIY_SKpFZUYkYA"
})


async function fetchEntries() {
  try {
    const entries = await client.getEntries({
      content_type: "blogPost"
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
    return entries;
  } catch (error) {
    console.log("ERROR", error);
  }
}


/**
 * This works with the useFocus hook to reload the page if data has changed.
 * It works by fetching the current page async, and comparing the X-Version
 * header to the current one (passed in as pageDataHash)
 */
export function useFocusReload(pageDataHash, callback) {
  const focused = useFocus();

  useEffect(() => {
    console.log('useEffect FOCUS');

    async function handleFocus() {
      console.log('handleFocus');

      const newData = await fetchEntries();
      console.log('newData', newData[0].fields.title);

      if (focused) {
        console.log('focused');
        const res = await fetch(window.location, {
          headers: {
            pragma: 'no-cache',
          },
        });

        if (res.ok) {
          console.log('res.ok');
          const resText = await res.text();
          const reg = /(?<=<script id="__NEXT_DATA__" type="application\/json">)([^<>]*)(?=<\/script>)/gmi;
          const __NEXT_DATA__JSON = JSON.parse(resText.match(reg)[0]);
          const prevPageDataHash = __NEXT_DATA__JSON.props.pageProps.pageDataHash;

          console.log('prevPageDataHash ----- pageDataHash ', prevPageDataHash, pageDataHash);

          if (res.ok && pageDataHash) {
            console.log('prevPageDataHash !== pageDataHash');
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