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
export default function NameAndReactionsMobile(data: Props) {
  const { authorProfile, art } = data;
  return (
    <Box
      sx={{
        display: {
          xs: "flex",
          sm: "none",
        },
        flexDirection: "column",
      }}
    >
      <span>
        <UserProfileOnSingleArt
          uid={authorProfile.uid}
          name={authorProfile.displayName}
          imageURL={authorProfile.profileURL}
          date={firebaseTimestampToString(art.created)}
          size={"sm"}
        />
      </span>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          mt: 2,
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
  );
}
