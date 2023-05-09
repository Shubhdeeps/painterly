import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { CommentsProps } from "@/models/Comment";
import React from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

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
      <Avatar
        src={isPfpAvailable ? isPfpAvailable : comment.author.name.charAt(0)}
      />
      {label}
    </Stack>
  );
}
