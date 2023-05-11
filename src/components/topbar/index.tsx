import React from "react";
import { Container } from "react-bootstrap";
import Notifications from "../notifications/Notifications";
import Searchbar from "./Searchbar";
import Userprofile from "./Userprofile";
import FriendRequest from "../notifications/FriendRequest";
import { Box } from "@mui/material";

export default function TopBar({
  setSideBarFlex,
}: {
  setSideBarFlex: Function;
}) {
  return (
    <div className="top-bar-container">
      <div className="top-bar-emptyspace"></div>
      <div className="top-bar">
        <Container className="h-100 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i
              onClick={() => setSideBarFlex()}
              className="bi bi-list fontSecondary text-1 sidebar-flex-icon"
            ></i>
            <div className="search-bar-container ">
              <Searchbar setSideBarFlex={undefined} />
            </div>
          </div>
          <Box display="flex" gap={1} alignItems="center">
            <FriendRequest />
            <Notifications />
            <Userprofile />
          </Box>
        </Container>
      </div>
    </div>
  );
}
