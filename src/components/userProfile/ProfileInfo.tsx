import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import OutlinedButton from "../Sidebar/OutlinedButton";
import { auth } from "@/services/firebaseConfig";
import Connection from "./components/Connection";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type Props = {
  name: string;
  imageURL: string | null;
  description: string | null;
  currentUserProfile: boolean;
  uid: string;
};
export default function ProfileInfo({
  name,
  imageURL,
  description,
  currentUserProfile,
  uid,
}: Props) {
  const currUserId = auth.currentUser?.uid!;
  const doesProfileBelongsToCurrUser = uid === currUserId;
  return (
    <div className="profile-container">
      <div className="d-flex flex-column gap-2 profile-container-child">
        <div className="profile-card secondary-bg border-radius-14">
          {imageURL ? (
            <Link href={`/profile/${uid}/`} passHref>
              <Image
                src={imageURL}
                className="profile-card-image border-radius-14"
                alt="pfp"
              />
            </Link>
          ) : (
            <div className="profile-card-image border-radius-14">
              {name.charAt(0)}
            </div>
          )}
          <div className="card-details">
            <Typography variant="h6">{name}</Typography>
            {description && (
              <Typography variant="caption" color="GrayText">
                {description}
              </Typography>
            )}
            {doesProfileBelongsToCurrUser ? (
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
        </div>
      </div>
    </div>
  );
}
