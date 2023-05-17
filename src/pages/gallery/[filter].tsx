import React, { useState } from "react";
import HashTitles from "@/components/headings/HashTitles";
import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import { getAllPosts } from "@/services/firestore/posts";
import SingleArtLoader from "@/components/loader/SingleArtLoader";

const hashTitles = ["All", "Abstract", "Pencil", "Colorful", "Anime"];
export default function Page() {
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  return (
    <div>
      <Header title="GALLERY" />
      <HashTitles parentPath="gallery" hashTitles={hashTitles} />
      <FetchFireData
        entity="GALLERY"
        breakpointColumnsObj={{
          default: 4,
          1600: 3,
          1200: 2,
          770: 1,
        }}
        setArt={setArt}
        setImageCordinates={setImageCordinates}
        getPosts={getAllPosts}
      />
    </div>
  );
}

// export default FetchFireData(Page, getAllPosts);
