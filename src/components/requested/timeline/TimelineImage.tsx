import { Box, Typography } from "@mui/material";
import { Image } from "react-bootstrap";
import React from "react";
import { mui_consts } from "@/styles/mui";
import { Timestamp } from "@/services/firebaseConfig";
import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import MentorHighlighter from "@/components/highlighter/MentorHighlighter";
export default function TimelineImage({
  bottomLine,
  imageURL,
  created,
  isMentor,
}: {
  bottomLine?: boolean;
  imageURL: string;
  created: Timestamp;
  isMentor?: boolean;
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
          {isMentor && (
            <Box
              sx={{
                position: "absolute",
                top: "-9px",
                left: "-9px",
                transform: "rotate(-22deg)",
              }}
            >
              <MentorHighlighter size="xmd" />
            </Box>
          )}
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
          display="flex"
          alignItems="center"
          flexDirection="row"
          sx={{
            width: "fit-content",
            ml: "44.8px",
            mt: 0.5,
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

        {bottomLine && (
          <Box
            sx={{
              borderLeft: `3px solid ${mui_consts.secondary}`,
              height: "70px",
              marginTop: "-30px",
              ml: "50px",
            }}
          ></Box>
        )}
      </Box>
    </>
  );
}
