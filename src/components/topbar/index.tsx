import React from "react";
import { Container } from "react-bootstrap";
import Notifications from "./Notifications";
import Searchbar from "./Searchbar";
import Userprofile from "./Userprofile";

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
              <Searchbar />
            </div>
          </div>
          <div className="d-flex gap-4 align-items-center">
            <Notifications />
            <Userprofile />
          </div>
        </Container>
      </div>
    </div>
  );
}
