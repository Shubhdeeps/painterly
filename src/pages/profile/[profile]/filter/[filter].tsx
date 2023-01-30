import CardGrid from "@/components/cardGrid";
import Community from "@/components/userProfile/Community";
import ProfileHashTitles from "@/components/userProfile/ProfileHashTitles";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { useRouter } from "next/router";
import React from "react";

export default function Index() {
  const router = useRouter();
  const { profile, filter } = router.query;

  return (
    <section className="d-flex profile-filter-container gap-2">
      <div className="d-flex flex-column pt-3 ws-100">
        <ProfileHashTitles
          parentPath={`profile/${profile}/filter`}
          hashTitles={["Posts", "Requested", "Community"]}
        />
        {filter === "posts" && <CardGrid />}
        {filter === "community" && <Community />}
      </div>
      <ProfileInfo
        currentUserProfile={true}
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        name="Shubhdeep Singh"
        username="shubhd_deep_02"
        imageURL="https://as2.ftcdn.net/v2/jpg/03/64/21/11/1000_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
      />
    </section>
  );
}
