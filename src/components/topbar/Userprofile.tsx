import { auth } from "@/services/firebaseConfig";
import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";

export default function Userprofile() {
  const currUser = auth.currentUser?.uid;
  const photoURL = auth.currentUser?.photoURL;
  const displayName = auth.currentUser?.displayName;
  return (
    <Link href={`/profile/${currUser}`}>
      <div className="d-flex gap-2 align-items-center cursor">
        <span className="fontSecondary text-18">
          {displayName?.split(" ")[0]}
        </span>
        <div className="rounded-profile-container secondaryTransparent-bg">
          <Image
            fluid
            src={photoURL ? photoURL : displayName?.charAt(0)}
            className="rounded-profile-container"
            alt="pfp"
          />
        </div>
      </div>
    </Link>
  );
}
