import React, { useState } from "react";
import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import { getCurrUserProfile } from "@/services/firestore/profile";
import { Timestamp } from "@/services/firebaseConfig";
import { getCurrUserRequests } from "@/services/firestore/requests/timeline";

export default function Page() {
  const [_imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [_art, setArt] = useState<any>();

  // if (!!imageCordinates) {
  //   return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  // }

  async function getPosts(
    lastPostDate: Timestamp | undefined,
    _filter: string | undefined
  ) {
    const user = await getCurrUserProfile();
    const currUserRequestedPosts = await getCurrUserRequests(
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
