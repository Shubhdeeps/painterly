import React, { useRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import InputTextField from "../inputFields/InputTextField";
import SendIcon from "@mui/icons-material/Send";

export default function CreateComment() {
  const a = useRef("");
  return (
    <Box
      sx={{
        borderRadius: "12px",
        padding: "10px",
        background: "#2B2B2B",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Avatar
        src={
          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }
      />
      <Box flexGrow={1}>
        <InputTextField
          textRef={a}
          icon={undefined}
          placeholder="Add a comment..."
        />
      </Box>
      <IconButton>
        <SendIcon color="primary" />
      </IconButton>
    </Box>
  );
}
