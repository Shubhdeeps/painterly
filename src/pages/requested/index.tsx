import React, { useState } from "react";
import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import SingleArtLoader from "@/components/loader/SingleArtLoader";
import { Post } from "@/models/Post";
import { getCurrUserProfile } from "@/services/firestore/profile";
import { getRequestedPosts } from "@/services/firestore/post/requests/getRequestPosts";
import { Timestamp } from "@/services/firebaseConfig";

export default function Page() {
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  async function getPosts(
    lastPostDate: Timestamp | undefined,
    _filter: string | undefined
  ) {
    const user = await getCurrUserProfile();
    const currUserRequestedPosts = await getRequestedPosts(
      lastPostDate,
      user.uid
    );
    return currUserRequestedPosts;
  }

  return (
    <div>
      <Header title="REQUESTED FOR REVIEW" />
      <FetchFireData
        entity="REQUESTS"
        breakpointColumnsObj={{
          default: 4,
          1600: 3,
          1200: 2,
          770: 1,
        }}
        setArt={setArt}
        setImageCordinates={setImageCordinates}
        getPosts={getPosts}
      />
    </div>
  );
}
