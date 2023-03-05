import Loader from "@/components/loader/Loader";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { Profile } from "@/models/Profile";
import { getProfileByUID } from "@/services/firestore/profiles";
import { useRouter } from "next/router";
import React from "react";

export default function Index({ author }: { author: string }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader text="" />;
  }
  const authorProfile = JSON.parse(author) as Profile;
  // const { profile, filter } = router.query;

  return (
    <section className="d-flex profile-filter-container gap-2">
      <div className="d-flex flex-column pt-3 ws-100">
        {/* <ProfileHashTitles
          parentPath={`profile/${profile}/filter`}
          hashTitles={["Posts", "Requested", "Community"]}
        /> */}
        {/* {filter === "posts" && <CardGrid  />} */}
        {/* {filter === "community" && <Community />} */}
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
