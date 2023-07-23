import { mui_consts } from "@/styles/mui";
import { Box } from "@mui/material";
import React from "react";

export default function TimelineWrapper({
  bottomLine,
  children,
}: {
  bottomLine?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        sx={{
          background: mui_consts.secondary,
          p: 0.5,
          borderRadius: "18px",
        }}
      >
        {children}
      </Box>
      {bottomLine && (
        <Box
          sx={{
            borderLeft: "2px solid gray",
            height: "50px",
            marginTop: "0px",
            ml: "20px",
          }}
        ></Box>
      )}
    </>
  );
}
