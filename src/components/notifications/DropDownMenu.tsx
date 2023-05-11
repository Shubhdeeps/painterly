import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function DropDownMenu({
  anchorEl,
  handleClose,
}: {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}) {
  return (
    <Menu
      sx={{
        mt: "37px",
      }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Box
        sx={{
          px: 2.5,
          py: 1,
          pt: 2,
          width: {
            xs: "320px",
            sm: "460px",
            md: "540px",
          },
        }}
      >
        <Typography variant="h5" sx={{}}>
          Notifications
        </Typography>
      </Box>
      <StyledMenuItem
        name="Roger Black"
        content="commented on your art"
        handleClose={handleClose}
        src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1007"
      />
      <StyledMenuItem
        name="Roger Black"
        content="liked your art"
        handleClose={handleClose}
        src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1007"
      />
      <StyledMenuItem
        content="commented on your art"
        name="Victoria"
        handleClose={handleClose}
        src="https://www.maxpixel.net/static/photo/1x/Young-Model-Person-Woman-Lady-Face-Female-Makeup-6109643.jpg"
      />
    </Menu>
  );
}

const StyledMenuItem = ({
  handleClose,
  src,
  name,
  content,
}: {
  handleClose: () => void;
  src: string;
  name: string;
  content: string;
}) => (
  <MenuItem onClick={handleClose}>
    <Box px={1} display="flex" alignItems="center" gap={2}>
      <Avatar src={src} />
      <Typography variant="subtitle1">
        <strong>{name} </strong>
        {content}
      </Typography>
    </Box>
  </MenuItem>
);
