import React from "react";
import Box from "@mui/material/Box";
import CommentAvatar from "./CommentAvatar";
import { CommentsProps } from "@/models/Comment";

export default function Comment({ comment }: { comment: CommentsProps }) {
  return (
    <Box
      sx={{
        padding: "5px",
        background: "#2B2B2B",
        borderRadius: "16px",
      }}
    >
      <CommentAvatar comment={comment} />
      <Box
        className="text-4"
        sx={{
          color: "#949494",
        }}
      >
        {comment.commentText}
      </Box>
    </Box>
  );
}
