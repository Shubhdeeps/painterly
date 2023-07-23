import { Box, Typography } from "@mui/material";
import { Image } from "react-bootstrap";
import React from "react";
import { mui_consts } from "@/styles/mui";
import { Timestamp } from "@/services/firebaseConfig";
import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
export default function TimelineImage({
  bottomLine,
  imageURL,
  created,
}: {
  bottomLine?: boolean;
  imageURL: string;
  created: Timestamp;
}) {
  return (
    <>
      <Box position="relative">
        <Box
          sx={{
            background: mui_consts.secondary,
            p: 0.5,
            borderRadius: "12px",
            width: "fit-content",
          }}
        >
          <Image
            className="request_image"
            width={300}
            height={200}
            src={imageURL}
            alt="timeline"
          />
        </Box>
        <Box
          gap={1}
          mt={1}
          display="flex"
          alignItems="center"
          flexDirection="row"
          sx={{
            width: "fit-content",
            ml: 4,
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              width: "10px",
              height: "10px",
              background: "gray",
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
        {bottomLine && (
          <Box
            sx={{
              borderLeft: "2px solid gray",
              height: "70px",
              marginTop: "-30px",
              ml: "20px",
            }}
          ></Box>
        )}
      </Box>
    </>
  );
}
