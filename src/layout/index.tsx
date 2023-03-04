import { auth } from "@/services/firebaseConfig";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/topbar";
import PageLoader from "next/dist/client/page-loader";
import Loader from "../components/loader/Loader";
import Authenticate from "../components/authenticate/Authenticate";

export default function Layout({ children }: { children: any }) {
  const [sideBarFlex, setSideBarFlex] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currUser, setCurrUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user) {
        setCurrUser(user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCurrUser(null);
      }
    });
  }, [auth.currentUser]);

  if (isLoading) {
    return <Loader text="Authenticating" />;
  }
  // console.log(currUser);
  console.log(auth.currentUser?.email);

  return (
    <>
      {currUser ? (
        <>
          <div
            className="main-container"
            onClick={(e) => {
              e.preventDefault();
              sideBarFlex && setSideBarFlex(false);
            }}
          >
            <TopBar setSideBarFlex={() => setSideBarFlex(!sideBarFlex)} />
            <div className="d-flex flex-column w-100 body-container">
              <div className="appbar-emptyspace"></div>
              <Container className="fontPrimary mb-4">{children}</Container>
            </div>
          </div>
          <Sidebar setSideBarFlex={setSideBarFlex} sideBarFlex={sideBarFlex} />
        </>
      ) : (
        <Authenticate />
      )}
    </>
  );
}
