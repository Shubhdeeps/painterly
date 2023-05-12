import React from "react";
import Box from "@mui/material/Box";
import CommentAvatar from "./CommentAvatar";
import { CommentsProps } from "@/models/Comment";
import { Typography } from "@mui/material";

export default function Comment({
  comment,
  highlighted,
}: {
  comment: CommentsProps;
  highlighted: boolean;
}) {
  return (
    <Box
      sx={{
        padding: "5px",
        background: highlighted ? "#414141" : "#2B2B2B",
        borderRadius: "16px",
      }}
    >
      <CommentAvatar comment={comment} />
      <Box
        className="text-4"
        sx={{
          color: "text.secondary",
          px: 1,
          py: 0.5,
        }}
      >
        <Typography variant="subtitle1">{comment.commentText}</Typography>
      </Box>
    </Box>
  );
}
