import Head from 'next/head'
import { useEffect, useState } from 'react'
import Post from '../components/post'
import fetch from "node-fetch";
import { setVersionHeader } from '../lib/setVersionHeader';
import { useFocusReload } from '../lib/useFocusReload';
import { cachePageFor } from '../lib/cachePageFor';
import { fetchEntries } from "../lib/contentfulHelpers";



function HomePage({ posts = [], pageDataHash }) {

  const [dataChanged, setDataChanged] = useState(false);

  useFocusReload(pageDataHash, ({ previous, current }) => {
    console.log('DATA CHANGED! REFRESH NOW!', previous, current);
    setDataChanged(true);
  });

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

  const handleClick = async () => {
    window.location.reload();
  }

  // console.log('POSTS', posts)

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

      {
        dataChanged && <div onClick={handleClick}>DATA CHANGED! REFRESH NOW!</div>
      }

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


export async function getStaticProps ({ res }) {
  const allPosts = await fetchEntries();
  const xVersion = setVersionHeader(allPosts, res);
  cachePageFor(60, res);

  return {
    props: {
      posts: allPosts,
      pageDataHash: xVersion,
    },
    unstable_revalidate: 1,
  };
}


export default HomePage;
