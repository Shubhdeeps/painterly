import CardGrid from "@/components/cardGrid";
import HashTitles from "@/components/headings/HashTitles";
import Header from "@/components/headings/Header";
import SingleArtLoader from "@/components/loader/SingleArtLoader";
import { getAllPosts } from "@/services/firestore/gallery/getAllGalleryPosts";
import React, { useState } from "react";

const hashTitles = ["All", "Abstract", "OilPaintaing", "Colorful", "Anime"];
export default function Filter({ posts }: { posts: string }) {
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();
  const handleOpenImage = (cordinations: any, post: any) => {
    setImageCordinates(cordinations);
    setArt(post);
  };
  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  return (
    <div>
      <Header title="GALLERY" />
      <div></div>
      <HashTitles parentPath="all" hashTitles={hashTitles} />
      <CardGrid data={JSON.parse(posts)} handleOpenImage={handleOpenImage} />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { filter: hashTitles[0].toLowerCase() },
      },
      {
        params: { filter: hashTitles[1].toLowerCase() },
      },
      {
        params: { filter: hashTitles[2].toLowerCase() },
      },
      {
        params: { filter: hashTitles[3].toLowerCase() },
      },
      {
        params: { filter: hashTitles[4].toLowerCase() },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const response = await getAllPosts(undefined, params);

  return {
    props: {
      posts: JSON.stringify(response),
    },
    revalidate: 10,
  };
}
