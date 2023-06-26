import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import Loader from "@/components/loader/Loader";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { Profile } from "@/models/Profile";
import { getProfileByUID } from "@/services/firestore/profiles";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getPostsBasedOnUid } from "@/services/firestore/post/posts";
import SingleArtLoader from "@/components/loader/SingleArtLoader";
import ProfileHashTitles from "@/components/userProfile/components/ProfileHashTitles";
import Community from "@/components/userProfile/components/Community";
import { Box } from "@mui/material";
export default function Index({ author }: { author: string }) {
  const router = useRouter();
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();
  const [currentPage, setCurrentPage] = useState("posts");

  if (router.isFallback) {
    return <Loader text="" />;
  }
  const authorProfile = JSON.parse(author) as Profile;

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  const getPostsBasedOnUidFiltered = (
    lastPostDate: any,
    filter: string | undefined
  ) => {
    return getPostsBasedOnUid(lastPostDate, authorProfile.uid);
  };
  return (
    <>
      <ProfileInfo
        uid={authorProfile.uid}
        currentUserProfile={true}
        description={authorProfile.description}
        name={authorProfile.displayName}
        imageURL={authorProfile.profileURL}
      />
      <br />
      {/* <Box mt={3}></Box> */}
      <ProfileHashTitles
        hashTitles={["Posts", "Connections"]}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {currentPage === "posts" ? (
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
          getPosts={getPostsBasedOnUidFiltered}
        />
      ) : (
        <Community />
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const author = await getProfileByUID(params.profile);

  return {
    props: {
      author: author ? JSON.stringify(author) : null,
    },
  };
}
