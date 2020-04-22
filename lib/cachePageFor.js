/**
 * This sets a cache header for the specified amount of time. Time is in seconds.
 */
export function cachePageFor(cacheTime = 60, res) {
  if (cacheTime && res) {
    res.setHeader(
      "Cache-Control",
      `s-maxage=${cacheTime}, stale-while-revalidate`
    );
  }
}