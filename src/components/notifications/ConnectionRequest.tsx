import React, { useEffect, useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { auth, database } from "@/services/firebaseConfig";
import DropDownMenu from "./DropDownMenu";
import { notificationSorting } from "@/services/helperFunctions/notificationSorting";
import { ConnectionRequestModel } from "@/models/Notification";
import { seenCurrUserRequestNotification } from "@/services/realtimeDB/relations/requests/seenRequestNotifications";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 7,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function ConnectionRequest() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<ConnectionRequestModel[]>(
    []
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { uid } = auth.currentUser!;

  useEffect(() => {
    database.ref("requests/" + uid).on("value", (snapshot) => {
      const data = snapshot.val() as {
        [id: string]: ConnectionRequestModel;
      };

      if (data) {
        const count = Object.keys(data).length;
        setNotificationCount(count);
        const newUnSeenRequests: ConnectionRequestModel[] = [];
        for (const key of Object.keys(data)) {
          // check if the requests are seen
          const requestData = data[key];
          if (
            requestData.status === "unseen" ||
            requestData.type === "REQUEST"
          ) {
            // only push if its either unseen or type of REQUEST
            newUnSeenRequests.push(requestData);
          }
        }
        setNotifications(newUnSeenRequests);
      } else {
        setNotificationCount(0);
        setNotifications([]);
      }
    });
  }, [uid]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllRead = () => {
    const uids = notifications.map((notification) => notification.senderUid);
    seenCurrUserRequestNotification(uids);
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
        <Person2Icon sx={{ color: "text.secondary" }} fontSize="large" />
      </StyledBadge>
      <DropDownMenu
        entity="Connections"
        anchorEl={anchorEl}
        handleClose={handleClose}
        notifications={notifications.sort(notificationSorting)}
        markReadAll={handleMarkAllRead}
      />
    </IconButton>
  );
}
