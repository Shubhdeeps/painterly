import { auth } from "@/services/firebaseConfig";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import React from "react";

export default function Userprofile() {
  const currUser = auth.currentUser?.uid;
  const photoURL = auth.currentUser?.photoURL;
  const displayName = auth.currentUser?.displayName;
  return (
    <Link href={`/profile/${currUser}`}>
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
