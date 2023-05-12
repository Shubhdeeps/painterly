import React from "react";
import fire from "./reactions/fire.png";
import sad from "./reactions/sad.png";
import smile from "./reactions/smile.png";
import shocked from "./reactions/shocked.png";
import heart from "./reactions/heart.png";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function ReactionsPallet() {
  return (
    <AvatarGroup>
      <Avatar
        sx={{ border: "none !important", width: "32px", height: "32px" }}
        src={fire.src}
      />
      <Avatar
        sx={{ border: "none !important", width: "32px", height: "32px" }}
        src={smile.src}
      />
      <Avatar
        sx={{ border: "none !important", width: "32px", height: "32px" }}
        src={shocked.src}
      />
    </AvatarGroup>
  );
}
