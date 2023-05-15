import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import Loader from "@/components/loader/Loader";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { Profile } from "@/models/Profile";
import { getProfileByUID } from "@/services/firestore/profiles";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getPostsBasedOnUid } from "@/services/firestore/posts";
import SingleArtLoader from "@/components/loader/SingleArtLoader";
import ProfileHashTitles from "@/components/userProfile/components/ProfileHashTitles";
import Community from "@/components/userProfile/components/Community";
import { connectWithNewUser } from "@/services/realtimeDB/relations/connectWithNewUser";
export default function Index({ author }: { author: string }) {
  const router = useRouter();
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();
  const [currentPage, setCurrentPage] = useState("posts");

  // useEffect(() => {
  //   (async function () {
  //     await connectWithNewUser("testing", "FOLLOW");
  //   })();
  // }, []);
  if (router.isFallback) {
    return <Loader text="" />;
  }
  const authorProfile = JSON.parse(author) as Profile;

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  return (
    <section className="d-flex profile-filter-container gap-2">
      <div className="d-flex flex-column ws-100">
        <ProfileHashTitles
          hashTitles={["Posts", "Connections"]}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {currentPage === "posts" ? (
          <FetchFireData
            breakpointColumnsObj={{
              default: 2,
              770: 1,
            }}
            setArt={setArt}
            setImageCordinates={setImageCordinates}
            getPosts={getPostsBasedOnUid}
          />
        ) : (
          <Community />
        )}
      </div>
      <ProfileInfo
        uid={authorProfile.uid}
        currentUserProfile={true}
        description={authorProfile.description}
        name={authorProfile.displayName}
        imageURL={authorProfile.profileURL}
      />
    </section>
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
