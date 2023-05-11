import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { auth, database } from "@/services/firebaseConfig";
import { Notification } from "@/models/Notification";
import DropDownMenu from "./DropDownMenu";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Notifications() {
  const [notificationCount, setNotificationCount] = useState(3);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { uid } = auth.currentUser!;

  useEffect(() => {
    database.ref("notifications/unseen/" + uid).on("value", (snapshot) => {
      const data = snapshot.val() as { [id: string]: Notification };
      if (data) {
        const count = Object.keys(data).length;
        // setNotificationCount(count);
      }
    });
  }, [uid]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <IconButton
      aria-label="cart"
      sx={{
        outline: "none !important",
      }}
    >
      <StyledBadge
        onClick={handleMenu}
        badgeContent={notificationCount}
        color="secondary"
      >
        <NotificationsIcon sx={{ color: "text.secondary" }} fontSize="large" />
      </StyledBadge>
      <DropDownMenu anchorEl={anchorEl} handleClose={handleClose} />
    </IconButton>
  );
}
