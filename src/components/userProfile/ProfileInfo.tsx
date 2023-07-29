import React from "react";
import { auth } from "@/services/firebaseConfig";
import Connection from "./components/Connection";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Box } from "@mui/material";
import MentorHighlighter from "../highlighter/MentorHighlighter";

type Props = {
  name: string;
  imageURL: string | null;
  description: string | null;
  currentUserProfile: boolean;
  uid: string;
  isMentor?: boolean;
};
export default function ProfileInfo({
  name,
  imageURL,
  description,
  currentUserProfile,
  uid,
  isMentor,
}: Props) {
  const currUserId = auth.currentUser?.uid!;
  const doesProfileBelongsToCurrUser = uid === currUserId;
  return (
    <>
      <Box
        sx={{
          p: 4,
          width: "100%",
          display: "flex",
          // flexWrap: "wrap",
          flexDirection: {
            md: "row",
            xs: "column",
          },
          alignItems: "center",
          gap: {
            md: 5,
            sm: 3,
            xs: 1,
          },
        }}
        className="secondary-bg border-radius-14"
      >
        <Box
          sx={{
            // border: "1px solid red",
            position: "relative",
          }}
        >
          <Avatar
            alt={name}
            src={imageURL ? imageURL : name.charAt(0)}
            sx={{
              width: 220,
              height: 220,

              bgcolor: "orange",
              fontSize: "42px",
            }}
          />
          {isMentor && (
            <Box
              sx={{
                position: "absolute",
                zIndex: 2,
                top: "-10%",
                right: "-10%",
              }}
            >
              <MentorHighlighter />
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: {
              md: 2,
              xs: 0,
            },
            alignItems: {
              xs: "center",
              md: "start",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "18px",
                sm: "22px",
                md: "26px",
              },
            }}
            variant="h4"
          >
            {name}
          </Typography>
          <Typography
            sx={{
              maxWidth: "230px",
            }}
            variant="caption"
            color="GrayText"
          >
            {description}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "end",
          }}
        >
          {doesProfileBelongsToCurrUser ? (
            <Button
              sx={{
                borderRadius: "25px",
                px: 2,
                width: "160px",
                fontSize: "13px",
                mb: 1,
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
        </Box>
      </Box>
    </>
  );
}

{
  /* <div className="profile-container">
<div className="d-flex flex-row gap-2 profile-container-child">
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
    </div>
  </div> */
}
