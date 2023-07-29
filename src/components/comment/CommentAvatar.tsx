import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { CommentsProps } from "@/models/Comment";
import React from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import MentorHighlighter from "../highlighter/MentorHighlighter";

export default function CommentAvatar({ comment }: { comment: CommentsProps }) {
  const isPfpAvailable = comment.author.profileURL;
  const label = (
    <Stack>
      {comment.author.name}
      <span className="text-7 mt--1">
        {firebaseTimestampToString(comment.date)}
      </span>
    </Stack>
  );
  return (
    <Stack
      // onClick={() =>
      direction="row"
      spacing={1}
    >
      <Box
        sx={{
          // border: "1px solid red",
          position: "relative",
        }}
      >
        <Avatar
          src={isPfpAvailable ? isPfpAvailable : comment.author.name.charAt(0)}
        />
        {comment.author.isMentor && (
          <Box
            sx={{
              position: "absolute",
              top: "-9px",
              left: "-15px",
              transform: "rotate(-22deg)",
            }}
          >
            <MentorHighlighter size="sm" />
          </Box>
        )}
      </Box>
      {label}
    </Stack>
  );
}
