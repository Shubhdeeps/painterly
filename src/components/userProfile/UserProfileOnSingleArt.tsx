import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import OutlinedButton from "../Sidebar/OutlinedButton";
import { auth } from "@/services/firebaseConfig";
import Connection from "./components/Connection";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CommentAvatar from "../comment/CommentAvatar";
import Member from "./components/Member";

type Props = {
  name: string;
  imageURL: string | null;
  date?: string;
  size: "sm" | "md";
  uid: string;
};
export default function UserProfileOnSingleArt({
  name,
  imageURL,
  date,
  size,
  uid,
}: Props) {
  const currUserId = auth.currentUser?.uid!;
  const doesProfileBelongsToCurrUser = uid === currUserId;
  return (
    <>
      {imageURL ? (
        <Link href={`/profile/${uid}/`} passHref>
          <Member
            size={size}
            src={imageURL}
            title={name}
            uid={uid}
            date={date}
          />
          {/* <Image
                src={imageURL}
                className="profile-card-image border-radius-14"
                alt="pfp"
              /> */}
        </Link>
      ) : (
        <div className="profile-card-image border-radius-14">
          {name.charAt(0)}
        </div>
      )}
    </>
  );
}

{
  /* <div className="card-details">
<Typography variant="h6">{name}</Typography>
{description && (
  <Typography variant="caption" color="GrayText">
    {description}
  </Typography>
)}
{/* {doesProfileBelongsToCurrUser ? (
  <Button
    sx={{
      borderRadius: "20px",
      px: 4,
      my: 1,
      outline: "none !important",
    }}
    color="secondary"
    variant="outlined"
  >
    Manage
  </Button>
) : (
  <Connection profileAuthorUid={uid} />
)} 
</div>
*/
}
