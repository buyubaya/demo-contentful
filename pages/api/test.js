import { getSortedPostsData } from "../../lib/posts";
import { setHeaders, handleData, handleError } from '../../lib/utils'


const client = require('contentful').createClient({
  space: "rpawvh52ui6g",
  accessToken: "OLRHxqJs-ydHv9blPC-rFPk3BzREGcIY_SKpFZUYkYA"
})


async function fetchEntries() {
  try {
    const entries = await client.getEntries()
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
  } catch (error) {
    console.log("ERROR", error);
  }
}


export default async function testAPI(
  req,
  res
) {
  if (setHeaders(req, res)) return

  try {
    const posts = await fetchEntries()

    return handleData(res, {
      key: Date.now(),
      status: 'success',
      posts: posts,
    })
  } catch (error) {
    handleError(res, error)
  }

}
