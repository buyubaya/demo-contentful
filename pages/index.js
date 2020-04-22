import Head from 'next/head'
import { useEffect, useState } from 'react'
import Post from '../components/post'
import fetch from "node-fetch";
import { setVersionHeader } from '../lib/setVersionHeader';
import { useFocusReload } from '../lib/useFocusReload';


const client = require('contentful').createClient({
  space: "rpawvh52ui6g",
  accessToken: "OLRHxqJs-ydHv9blPC-rFPk3BzREGcIY_SKpFZUYkYA"
})


async function fetchEntries() {
  try {
    const entries = await client.getEntries()
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
    return entries;
  } catch (error) {
    console.log("ERROR", error);
  }
}


function HomePage({ posts = [], pageDataHash }) {
  useFocusReload(pageDataHash);

  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("/api/test");
  //     const json = await res.json();
  //     setPosts(json.posts);
  //   })();
  // }, []);

  // const handleClick = () => {
  //   fetch(window.location, {
  //     headers: {
  //       pragma: "no-cache"
  //     }
  //   })
  //     .then(async (res) => {
  //       console.log('res', await res.json());
  //       // window.location.reload();
  //     })
  // };

  // const handleClick = async () => {
  //   const res = await fetch("/api/test", {
  //     headers: {
  //       pragma: "no-cache"
  //     },
  //   });
  //   const json = await res.json();
  //   setPosts(json.posts);
  // };

  const handleClick = async () => {}

  console.log('POSTS', posts)

  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      
      <h1>HELLO HOME</h1>

      <button onClick={handleClick}>REFRESH</button>

      <div>
      {(posts || []).length > 0
        ? posts.map(p => (
            <Post
              alt={p.fields.alt}
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
            />
          ))
        : null}
      </div>
    </>
  )
}

HomePage.getInitialProps = async ({ res }) => {
  const allPosts = await fetchEntries();
  console.log('allPosts', allPosts)
  const pageDataHash = setVersionHeader(allPosts, res);

  return {
    posts: allPosts,
    pageDataHash: pageDataHash,
  };
}


export default HomePage;
