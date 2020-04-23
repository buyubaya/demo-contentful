
const client = require('contentful').createClient({
  space: "rpawvh52ui6g",
  // accessToken: "OLRHxqJs-ydHv9blPC-rFPk3BzREGcIY_SKpFZUYkYA",
  accessToken: "kAtYskTFWBeGYrw9xYrav0MwCIQlRTRS-YlBlvNpYj8",
  host: "preview.contentful.com"
})


export async function fetchEntries() {
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