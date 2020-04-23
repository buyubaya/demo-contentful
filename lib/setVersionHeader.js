/**
 * Sets an `X-version` header that is used to determine when CMS data has changed.
 * @param data The page data
 * @param res The response from the SSR server
 */
export function setVersionHeader(data, res) {
  // calculate a hash based on the passed data
  const pageDataHash = require('crypto')
    .createHash('md5')
    .update(JSON.stringify(data))
    .digest('hex');

  if (res) {
    res.setHeader('X-version', pageDataHash);
  }

  return pageDataHash;
} 