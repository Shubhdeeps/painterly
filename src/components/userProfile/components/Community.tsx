import React, { useEffect, useState } from "react";
import Member from "./Member";
import { useRouter } from "next/router";
import { getUserConnectionUidsBasedOnUidAndFilter } from "@/services/realtimeDB/relations/getUserConnectionBasedOnUidAndFilter";
import { getUsersProfileBasedOnUids } from "@/services/firestore/profile/getUsersProfileBasedOnUids";
import { Profile } from "@/models/Profile";

const filterToModel = {
  connections: "connections",
  followers: "userFollowers",
  followings: "userFollowings",
};
export default function Community() {
  const [profiles, setUserProfiles] = useState<Profile[]>([]);
  const [currentCommunity, setCurrentCommunity] = useState<
    "connections" | "followers" | "followings"
  >("connections");

  const url = useRouter();
  const uid = url.query.profile as string | undefined;
  useEffect(() => {
    const filter = filterToModel[currentCommunity] as
      | "connections"
      | "userFollowers";
    (async () => {
      if (uid) {
        const uids = await getUserConnectionUidsBasedOnUidAndFilter(
          uid,
          filter
        );
        const userProfiles = await getUsersProfileBasedOnUids(uids);
        setUserProfiles(userProfiles);
      }
    })();
  }, [currentCommunity, uid]);
  return (
    <div className="w-100 secondary-bg border-radius-14 p-4">
      <div className="d-flex gap-3 noselect">
        <span
          className={
            currentCommunity === "connections" ? "" : "fontSecondary cursor"
          }
          onClick={() => setCurrentCommunity("connections")}
        >
          Connections
        </span>
        {/* CAN BE ENABLED IN FUTURE! */}
        <span
          className={
            currentCommunity === "followers" ? "" : "fontSecondary cursor"
          }
          onClick={() => setCurrentCommunity("followers")}
        >
          Followers
        </span>
        <span
          className={
            currentCommunity === "followings" ? "" : "fontSecondary cursor"
          }
          onClick={() => setCurrentCommunity("followings")}
        >
          Followings
        </span>
      </div>
      <div className="secondaryTransparent-bg border-radius-14 d-flex flex-wrap gap-4 p-3 mt-4">
        {profiles.map((user) => {
          return (
            <React.Fragment key={user.uid}>
              <Member
                size="md"
                date={undefined}
                src={user.profileURL}
                title={user.displayName}
                uid={user.uid}
              />
            </React.Fragment>
          );
        })}
        {!profiles.length && <span>No {currentCommunity} found</span>}
      </div>
    </div>
  );
}
