import { Post } from "@/models/Post";
import { Timestamp } from "@/services/firebaseConfig";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Card from "../card";
import Loader from "../loader/Loader";
import SingleArtLoader from "../loader/SingleArtLoader";

export default function FetchFireData({
  getPosts,
  setArt,
  setImageCordinates,
}: {
  getPosts: (
    lastPostDate: Timestamp | undefined,
    filter: string
  ) => Promise<Post[] | null | undefined>;
  setArt: Function;
  setImageCordinates: Function;
}) {
  //   return function Fetch() {
  const router = useRouter();
  const filterName = router.asPath.split("/")[2]; // filter name
  console.log("FILTER NAME: ", filterName);
  //   const [imageCordinates, setImageCordinates] = useState<Object | null>(null);

  const [hasMore, setHasMore] = useState(true);
  //   const [art, setArt] = useState<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [renderPosts, setRenderPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [freshPosts, setFreshPosts] = useState<Post[]>([]);

  //for infinite scroll
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  //run on first load
  useEffect(() => {
    // for clearing when filter change
    setPosts([]);
    setHasMore(true);

    getPosts(undefined, filterName).then((res) => {
      if (res) {
        setFreshPosts(res);
        if (res.length < 10) {
          setHasMore(false);
        }
      }
    });
  }, [filterName]);

  useEffect(() => {
    if (!!freshPosts.length) {
      // window.scrollTo(0, getScrollPoisitonStorage(filterName));
      setPosts(freshPosts);
      setIsLoading(false);
    }
  }, [freshPosts]);

  // on view change
  useEffect(() => {
    if (!hasMore) {
      return;
    }
    if (inView && !!posts.length) {
      const lastPost = posts[posts.length - 1].created;
      getPosts(lastPost, filterName).then((res) => {
        if (res === null) {
          return;
        }
        if (res) {
          setRenderPosts(res);
          if (res.length < 10) {
            setHasMore(false);
          }
        }
      });
    }
  }, [filterName, hasMore, inView, posts]);

  useEffect(() => {
    if (!!renderPosts.length) {
      setPosts((prevPosts) => [...prevPosts, ...renderPosts]);
    }
  }, [renderPosts]);
  //   if (!!imageCordinates) {
  //     return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  //   }

  // for animated popup single image
  const handleOpenImage = (cordinations: any, post: any) => {
    setImageCordinates(cordinations);
    setArt(post);
  };

  return (
    <>
      {/* <WrappedComponent /> */}
      <div className="w-100 h-100 d-flex flex-wrap gap-4 justify-content-center">
        {posts.map((post: Post) => {
          return (
            <React.Fragment key={post.artId}>
              <Card data={post} handleOpenPost={handleOpenImage} />
            </React.Fragment>
          );
        })}
        {isLoading && <Loader text="" />}
        <div ref={ref}></div>
      </div>
    </>
  );
}
