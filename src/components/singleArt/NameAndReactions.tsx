import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import React from "react";
import UserProfileOnSingleArt from "../userProfile/UserProfileOnSingleArt";
import Box from "@mui/material/Box";
import { Profile } from "@/models/Profile";
import { Post } from "@/models/Post";
import Reactions from "../reactions/Reactions";

type Props = {
  authorProfile: Profile;
  art: Post;
};
export default function NameAndReactionsWeb(data: Props) {
  const { authorProfile, art } = data;
  return (
    <>
      <Box
        sx={{
          display: {
            sm: "flex",
            xs: "none",
          },
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span>
          <UserProfileOnSingleArt
            uid={authorProfile.uid}
            name={authorProfile.displayName}
            imageURL={authorProfile.profileURL}
            date={firebaseTimestampToString(art.created)}
            size="md"
          />
        </span>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {
              sm: "end",
              xs: "start",
            },
          }}
        >
          <Reactions
            shocked={art.shocked}
            fire={art.fire}
            heart={art.heart}
            sad={art.sad}
            smile={art.smile}
            postId={art.artId}
            artAuthorId={art.authorId}
          />
        </Box>
      </Box>
    </>
  );
}
