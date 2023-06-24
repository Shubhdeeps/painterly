import React from "react";
import fire from "./reactions/fire.png";
import sad from "./reactions/sad.png";
import smile from "./reactions/smile.png";
import shocked from "./reactions/shocked.png";
import heart from "./reactions/heart.png";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import { Typography, Box } from "@mui/material";
import RecommendIcon from "@mui/icons-material/Recommend";

const reactions = {
  sad,
  smile,
  shocked,
  heart,
  fire,
};

type Props = {
  name: "sad" | "smile" | "shocked" | "fire" | "heart";
  count: number;
};

export default function ReactionsPallet({
  data,
  totalCount,
}: {
  data: Props[];
  totalCount: number;
}) {
  if (!totalCount) {
    return (
      <IconButton
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          outline: "none !important",
          borderRadius: "50px !important",
        }}
      >
        <RecommendIcon color="secondary" />
        <Typography color="text.secondary" variant="subtitle1">
          Be the first one to react
        </Typography>
      </IconButton>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row-reverse",
          sm: "row",
        },
        alignItems: "center",
      }}
    >
      <Typography px={1} color="secondary" variant="h6">
        {totalCount}
      </Typography>
      <AvatarGroup>
        {data.map((reaction) => {
          return (
            <React.Fragment key={reaction.name}>
              <Avatar
                sx={{
                  border: "none !important",
                  width: "32px",
                  height: "32px",
                }}
                src={reactions[reaction.name].src}
              />
            </React.Fragment>
          );
        })}
      </AvatarGroup>
    </Box>
  );
}
