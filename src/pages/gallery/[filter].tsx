import Card from "@/components/card";
import HashTitles from "@/components/headings/HashTitles";
import Header from "@/components/headings/Header";
import Loader from "@/components/loader/Loader";
import SingleArtLoader from "@/components/loader/SingleArtLoader";
import { Post } from "@/models/Post";
import { timestamp, Timestamp } from "@/services/firebaseConfig";
import { getAllPosts } from "@/services/firestore/posts";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useSWR from "swr";

// let previousDate = timestamp;
// const fetcher = ({
//   lastDate,
//   filter,
// }: {
//   lastDate: Timestamp;
//   filter: string;
// }) => {
//   return getAllPosts(lastDate, filter);
// };
const hashTitles = ["All", "Abstract", "Pencil", "Colorful", "Anime"];
export default function Page() {
  const router = useRouter();
  const filterName = router.asPath.split("/")[2]; // filter name
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);

  const [hasMore, setHasMore] = useState(true);
  const [art, setArt] = useState<any>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [renderPosts, setRenderPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [freshPosts, setFreshPosts] = useState<Post[]>([]);

  // for animated popup single image
  const handleOpenImage = (cordinations: any, post: any) => {
    setImageCordinates(cordinations);
    setArt(post);
  };

  //for infinite scroll
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  // for clearing when filter change
  useEffect(() => {
    setPosts([]);
    setHasMore(true);
  }, [filterName]);

  //run on first load
  useEffect(() => {
    getAllPosts(undefined, filterName).then((res) => {
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
      getAllPosts(lastPost, filterName).then((res) => {
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

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  return (
    <div>
      <Header title="GALLERY" />
      <div></div>
      <HashTitles parentPath="gallery" hashTitles={hashTitles} />
      <div className="w-100 h-100 d-flex flex-wrap gap-4 justify-content-center">
        {posts.map((post: Post, index: number) => {
          return (
            <React.Fragment key={post.artId}>
              <Card data={post} handleOpenPost={handleOpenImage} />
            </React.Fragment>
          );
        })}
        {isLoading && <Loader text="" />}
        <div ref={ref}></div>
      </div>
    </div>
  );
}
