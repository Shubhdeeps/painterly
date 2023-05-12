import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Lottie from "react-lottie";
import sad from "./reactions/sad.json";
import fire from "./reactions/fire.json";
import smile from "./reactions/smile.json";
import shocked from "./reactions/shocked.json";
import heart from "./reactions/heart.json";

type Props = {
  type: "sad" | "smile" | "shocked" | "fire" | "heart";
};

const animations = {
  sad,
  fire,
  smile,
  shocked,
  heart,
};

const bgColors = {
  sad: "none",
  fire: "#601212",
  smile: "none",
  shocked: "none",
  heart: "#FF3030",
};

const dimensions = {
  sad: "40px",
  fire: "33px",
  smile: "40px",
  shocked: "40px",
  heart: "33px",
};

const padding = {
  sad: "0px",
  fire: "1px",
  smile: "0px",
  shocked: "0px",
  heart: "1px",
};

export default function Animation({ type }: Props) {
  const animationData = animations[type];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <IconButton
      sx={{
        outline: "none !important",
      }}
      size={"small"}
    >
      <Box
        className="emoji-size"
        sx={{
          width: dimensions[type],
          height: dimensions[type],
          background: bgColors[type],
          borderRadius: "50%",
          margin: padding[type],
        }}
      >
        <Lottie options={defaultOptions} width="100%" />
      </Box>
    </IconButton>
  );
}
