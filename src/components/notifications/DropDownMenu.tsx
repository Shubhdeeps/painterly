import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Notification } from "@/models/Notification";
import Link from "next/link";
import { timestampSecondsToString } from "@/services/helperFunctions/firebaseTimestampToString";
import {
  markReadAll,
  markReadBasedOnId,
} from "@/services/realtimeDB/notifications/markReadAll";

export default function DropDownMenu({
  entity,
  anchorEl,
  handleClose,
  notifications,
}: {
  entity: "Notifications" | "Connections";
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  notifications: Notification[];
}) {
  const handleMarkReadAll = () => {
    markReadAll();
  };

  const areNotificationsAvailable = !!notifications.length;

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
          {entity}
        </Typography>
      </Box>
      {notifications.map((notification) => {
        return (
          <React.Fragment key={notification.id}>
            <Link href={notification.redirectLink}>
              <StyledMenuItem
                notificationId={notification.id}
                name={notification.senderName}
                content={notification.content}
                handleClose={handleClose}
                src={notification.senderPhotoURL}
                time={timestampSecondsToString(notification.created)}
              />
            </Link>
          </React.Fragment>
        );
      })}
      {areNotificationsAvailable ? (
        <Box
          px={2.5}
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            sx={{
              outline: "none !important",
              borderRadius: "5px !important",
            }}
            color="info"
            onClick={handleMarkReadAll}
          >
            <DoneAllIcon fontSize="small" />
            <Typography pl={1} variant="subtitle2">
              Mark all read
            </Typography>
          </IconButton>

          <Button
            variant="contained"
            sx={{
              outline: "none !important",
              borderRadius: "5px !important",
            }}
            color="info"
          >
            See all
          </Button>
        </Box>
      ) : (
        <Box px={2}>
          <Typography pl={1} variant="subtitle2">
            No new {entity}
          </Typography>
        </Box>
      )}
    </Menu>
  );
}

const StyledMenuItem = ({
  handleClose,
  src,
  name,
  content,
  time,
  notificationId,
}: {
  handleClose: () => void;
  src: string | null;
  name: string;
  content: string;
  time: string;
  notificationId: string;
}) => {
  const handleReadSingleNotification = () => {
    markReadBasedOnId(notificationId);
    handleClose();
  };
  return (
    <MenuItem onClick={handleReadSingleNotification}>
      <Box px={1} display="flex" alignItems="center" gap={2}>
        <Avatar src={src ? src : name.charAt(0)} />
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1">
            <strong>{name} </strong>
            {content}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              marginTop: "-6px",
            }}
            variant="caption"
          >
            {time}
          </Typography>
        </Box>
      </Box>
    </MenuItem>
  );
};
