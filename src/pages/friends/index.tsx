import React, { useState, useEffect } from "react";
import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import { getCurrUserRelationPosts } from "@/services/firestore/post/communityPosts/getCurrUserRelationPosts";
import SingleArtLoader from "@/components/loader/SingleArtLoader";

export default function Page() {
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  return (
    <div>
      <Header title="COMMUNITY POSTS" />
      <FetchFireData
        entity="COMMUNITY"
        breakpointColumnsObj={{
          default: 4,
          1600: 3,
          1200: 2,
          770: 1,
        }}
        setArt={setArt}
        setImageCordinates={setImageCordinates}
        getPosts={getCurrUserRelationPosts}
      />
    </div>
  );
}
