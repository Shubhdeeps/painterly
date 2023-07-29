import { Timestamp } from "@/services/firebaseConfig";
import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { mui_consts } from "@/styles/mui";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function TimelineWrapper({
  bottomLine,
  children,
  created,
  isMentor,
}: {
  bottomLine?: boolean;
  children: React.ReactNode;
  created?: Timestamp;
  isMentor?: boolean;
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
            borderLeft: `3px solid ${mui_consts.secondary}`,
            height: "10px",
            marginTop: "0px",
            ml: "50px",
          }}
        ></Box>
      )}
      {created && (
        <Box
          gap={1}
          display="flex"
          alignItems="center"
          flexDirection="row"
          sx={{
            width: "fit-content",
            ml: "44.99999px",
            mt: -0.2,
            mb: -0.2,
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              width: "14px",
              height: "14px",
              background: mui_consts.primary,
            }}
          ></Box>
          <Typography
            sx={{
              color: mui_consts.fontSecondary,
              fontSize: mui_consts.text5,
              height: "fit-content",
            }}
          >
            {firebaseTimestampToString(created)}
          </Typography>
        </Box>
      )}
      {bottomLine && (
        <Box
          sx={{
            borderLeft: `3px solid ${mui_consts.secondary}`,
            height: "50px",
            marginTop: "0px",
            ml: "50px",
          }}
        ></Box>
      )}
    </>
  );
}
