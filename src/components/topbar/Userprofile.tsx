import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { getCurrUserProfile } from "@/services/firestore/profile";
import { Profile } from "@/models/Profile";
import { auth } from "@/services/firebaseConfig";

export default function Userprofile() {
  const [currUser, setCurrUser] = useState<Profile | null>(null);
  useEffect(() => {
    (async function () {
      const user = await getCurrUserProfile();
      setCurrUser(user);
    })();
  }, []);

  if (!currUser) {
    return (
      <Avatar
        src={auth.currentUser?.email?.charAt(0)}
        className="rounded-profile-container"
        alt="pfp"
        sx={{ width: 48, height: 48 }}
      />
    );
  }
  const currUserId = currUser.uid;
  const photoURL = currUser?.profileURL;
  const displayName = currUser?.displayName;
  return (
    <Link href={`/profile/${currUserId}`}>
      {/* <Box display="flex" gap={2} alignItems="center" className="cursor"> */}
      <Avatar
        src={photoURL ? photoURL : displayName?.charAt(0)}
        className="rounded-profile-container"
        alt="pfp"
        sx={{ width: 48, height: 48 }}
      />
      {/* </Box> */}
    </Link>
  );
}
