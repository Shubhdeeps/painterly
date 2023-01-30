import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Modal from "../modals";
import Sidebar from "../Sidebar";
import TopBar from "../topbar";

export default function Layout({ children }: { children: any }) {
  const modleOpen = false;
  const [sideBarFlex, setSideBarFlex] = useState(false);
  return (
    <>
      <div
        className="main-container"
        onClick={(e) => {
          e.preventDefault();
          sideBarFlex && setSideBarFlex(false);
        }}
      >
        {modleOpen && <Modal />}
        <TopBar setSideBarFlex={() => setSideBarFlex(!sideBarFlex)} />
        <div className="d-flex flex-column w-100 body-container">
          <div className="appbar-emptyspace"></div>
          <Container className="fontPrimary mb-4">{children}</Container>
        </div>
      </div>
      <Sidebar setSideBarFlex={setSideBarFlex} sideBarFlex={sideBarFlex} />
    </>
  );
}
