import React from "react";
import Person2Icon from "@mui/icons-material/Person2";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function FriendRequest() {
  return (
    <IconButton
      aria-label="cart"
      sx={{
        outline: "none !important",
      }}
    >
      <StyledBadge badgeContent={2} color="secondary">
        <Person2Icon sx={{ color: "text.secondary" }} fontSize="large" />
      </StyledBadge>
    </IconButton>
  );
}
