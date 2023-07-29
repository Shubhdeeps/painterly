import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const sizeAndDimensions = {
  sm: {
    width: "50px",
    height: "20px",
    fontSize: "11px",
    mt: "-10%",
  },
  xmd: {
    width: "70px",
    height: "35px",
    fontSize: "15px",
    mt: "-18%",
  },
  md: {
    width: "169px",
    height: "79px",
    fontSize: "28px",
    mt: "-35%",
  },
};
export default function MentorHighlighter({
  size,
}: {
  size?: "sm" | "md" | "xmd";
}) {
  const _size = sizeAndDimensions[size || "md"];
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <svg
        width={_size.width}
        height={_size.height}
        viewBox="0 0 169 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.7804 6.24785C48.8662 7.06025 167.231 40.7461 164.03 39.7459C160.829 38.7456 25.1631 12.7445 28.0706 11.1531C30.9782 9.56172 140.45 38.946 140.45 38.946C140.45 38.946 3.92929 15.675 5.83439 17.6809C7.73948 19.6869 159.071 47.9173 152.765 48.7555C146.459 49.5937 17.383 28.3454 13.9454 28.0492C10.5078 27.7531 159.658 57.1771 151.82 59.7251C143.982 62.2732 29.5619 42.0014 24.6311 42.9581C19.7003 43.9148 139.437 73.7568 129.812 72.9277C120.187 72.0986 38.84 62.7825 38.84 62.7825"
          stroke="#F57070"
          stroke-width="11"
          stroke-linecap="round"
        />
      </svg>
      <Typography
        sx={{
          position: "absolute",
          zIndex: 2,
          fontSize: _size.fontSize,
          fontWeight: 700,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, ${_size.mt})`,
        }}
      >
        Mentor
      </Typography>
    </Box>
  );
}
