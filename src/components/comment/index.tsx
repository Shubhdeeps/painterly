import React from "react";
import Box from "@mui/material/Box";
import CommentAvatar from "./CommentAvatar";
import { CommentsProps } from "@/models/Comment";
import { Typography } from "@mui/material";
import SelectMenu from "../inputFields/SelectMenu";

export default function Comment({
  comment,
  highlighted,
  currUserId,
}: {
  comment: CommentsProps;
  highlighted: boolean;
  currUserId?: string;
}) {
  const artAuthorIs = currUserId === comment.author.uid ? "self" : "other";
  const options = {
    self: [{ value: "Delete", action: () => alert("comment deleted") }],
    other: [{ value: "Report comment", action: () => alert("Reported!") }],
  };
  return (
    <>
      <Box
        sx={{
          padding: "5px",
          background: highlighted ? "#414141" : "#2B2B2B",
          borderRadius: "16px",
          position: "relative",
        }}
      >
        <SelectMenu list={options[artAuthorIs]} size="sm" />
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
    </>
  );
}
