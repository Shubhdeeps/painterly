import React, { useState, useEffect } from "react";
import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import SingleArtLoader from "@/components/loader/SingleArtLoader";
import { Post } from "@/models/Post";
import { getCurrUserProfile } from "@/services/firestore/profile";
import { getUserFavoriteArtIdsBasedOnUid } from "@/services/realtimeDB/userFavorites/getUserFavoriteArtId";
import { getPostsBasedOnArtIds } from "@/services/firestore/post/getPostsBasedOnArtids";

const AMOUNT_TO_FETCH = 10;
export default function Page() {
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  async function getPosts(
    lastPostDate: number,
    filter: string | undefined
  ): Promise<Post[]> {
    const user = await getCurrUserProfile();
    const userFavoriteArtIds = await getUserFavoriteArtIdsBasedOnUid(user.uid);
    const userFavIdsLimited = userFavoriteArtIds.splice(
      lastPostDate,
      AMOUNT_TO_FETCH
    );

    const postsBasedOnArtIds = await getPostsBasedOnArtIds(userFavIdsLimited);
    return postsBasedOnArtIds;
  }

  return (
    <div>
      <Header title="FAVORITE POSTS" />
      <FetchFireData
        entity="FAVORITE"
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
