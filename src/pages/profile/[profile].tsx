import Header from "@/components/headings/Header";
import FetchFireData from "@/components/HOCs/FetchFireData";
import Loader from "@/components/loader/Loader";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { Profile } from "@/models/Profile";
import { getProfileByUID } from "@/services/firestore/profiles";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getPostsBasedOnUid } from "@/services/firestore/posts";
import SingleArtLoader from "@/components/loader/SingleArtLoader";
export default function Index({ author }: { author: string }) {
  const router = useRouter();
  const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const [art, setArt] = useState<any>();

  if (router.isFallback) {
    return <Loader text="" />;
  }
  const authorProfile = JSON.parse(author) as Profile;
  // const { profile, filter } = router.query;

  if (!!imageCordinates) {
    return <SingleArtLoader art={art} cordinates={imageCordinates as any} />;
  }

  return (
    <section className="d-flex profile-filter-container gap-2">
      <div className="d-flex flex-column ws-100">
        <Header title="Posts" />
        <br />
        <FetchFireData
          breakpointColumnsObj={{
            default: 2,
            770: 1,
          }}
          setArt={setArt}
          setImageCordinates={setImageCordinates}
          getPosts={getPostsBasedOnUid}
        />
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
      author: JSON.stringify(author),
    },
  };
}
