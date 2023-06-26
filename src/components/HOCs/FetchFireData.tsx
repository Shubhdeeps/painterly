import { Post } from "@/models/Post";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Card from "../card";
import Loader from "../loader/Loader";
import Masonry from "react-masonry-css";
import RequestCard from "../card/RequestCard";
import { ArtRequests } from "@/models/Requests";

// true: if last post should be date, false if last post should be a number (for infinite scroll functionality)
const entityTypeAndLastPostOutputFormat = {
  GALLERY: true,
  COMMUNITY: false,
  FAVORITE: false,
  PROFILE: false,
  REQUESTS: true,
};

const entityAndCardComponent = {
  GALLERY: Card,
  COMMUNITY: Card,
  FAVORITE: Card,
  PROFILE: Card,
  REQUESTS: RequestCard,
};

export default function FetchFireData<T extends Post | ArtRequests>({
  getPosts,
  setArt,
  setImageCordinates,
  breakpointColumnsObj,
  entity,
}: {
  getPosts: (
    lastPostDate: any,
    filter: string | undefined
  ) => Promise<null | undefined | T[]>;
  setArt: Function;
  setImageCordinates: Function;
  breakpointColumnsObj: any;
  entity: "GALLERY" | "COMMUNITY" | "FAVORITE" | "PROFILE" | "REQUESTS";
}) {
  //   return function Fetch() {
  const router = useRouter();
  const filterName = router.asPath.split("/")[2]; // filter name

  const [hasMore, setHasMore] = useState(true);
  //   const [art, setArt] = useState<any>();
  const [posts, setPosts] = useState<T[]>([]);
  const [renderPosts, setRenderPosts] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [freshPosts, setFreshPosts] = useState<T[]>([]);

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
    const lastPost = entityTypeAndLastPostOutputFormat[entity] ? undefined : 0;
    getPosts(lastPost, filterName).then((res) => {
      if (res) {
        setFreshPosts(res);
        if (res.length < 10) {
          setHasMore(false);
        }
        if (res.length === 0) {
          // no posts to show
          setIsLoading(false);
        }
      }
    });
  }, [entity, filterName, getPosts]);

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
      const lastPostDate = posts[posts.length - 1].created;
      const lastItem = entityTypeAndLastPostOutputFormat[entity]
        ? lastPostDate
        : posts.length;

      getPosts(lastItem, filterName).then((res) => {
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
  }, [entity, filterName, getPosts, hasMore, inView, posts]);

  useEffect(() => {
    if (!!renderPosts.length) {
      setPosts((prevPosts) => [...prevPosts, ...renderPosts]);
    }
  }, [renderPosts]);

  // for animated popup single image
  const handleOpenImage = (cordinations: any, post: any) => {
    setImageCordinates(cordinations);
    setArt(post);
  };

  if (isLoading) {
    return <Loader text="" />;
  }
  const CardComponent = entityAndCardComponent[entity];
  return (
    <>
      {/* <WrappedComponent /> */}
      {/* <div className=" d-flex flex-wrap gap-4 justify-content-center"> */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {posts.map((post) => {
          return (
            <React.Fragment key={post.artId}>
              {/* @ts-ignore */}
              <CardComponent data={post} handleOpenPost={handleOpenImage} />
            </React.Fragment>
          );
        })}
        {posts.length === 0 && <h6>No posts to load.</h6>}
        {isLoading && <Loader text="" />}
        <div ref={ref}></div>
      </Masonry>
      {/* </div> */}
    </>
  );
}
