import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { NavButton } from "./NavButton";
import NavItemsBar from "./NavItemsBar";
import { useRouter } from "next/router";
import OutlinedButton from "./OutlinedButton";
import Searchbar from "../topbar/Searchbar";
import { signOut } from "@/services/auth/validateUser";
// import NewPost from "../modals/NewPost";
import Box from "@mui/material/Box";
const paths: { [title: string]: "GALLERY" | "PAINTERLY" } = {
  gallery: "GALLERY",
  community: "GALLERY",
  favourite: "GALLERY",
  requested: "GALLERY",
  faqs: "PAINTERLY",
  "privacy%20policy": "PAINTERLY",
  "contact%20us": "PAINTERLY",
  "about%20us": "PAINTERLY",
  feedback: "PAINTERLY",
};
export default function Sidebar({
  sideBarFlex,
  setSideBarFlex,
}: {
  sideBarFlex: boolean;
  setSideBarFlex: Function;
}) {
  // const [newPost, setNewPost] = useState(false);
  const router = useRouter();
  const currPathCategory = paths[router.asPath.split("/")[1]];

  const [currentFlex, setCurrentFlex] = useState(currPathCategory);

  return (
    <>
      {/* <NewPost isOpen={newPost} setOpen={setNewPost} /> */}
      <div
        className={`sidebar secondary-bg ${!sideBarFlex && "sidebar-flex"} `}
      >
        <div className="d-flex justify-content-end">
          <i
            className="bi bi-x-lg sidebar-flex-icon fontSecondary cursor text-2"
            onClick={() => setSideBarFlex(false)}
          ></i>
        </div>
        <div
          className="text-center cursor"
          onClick={() => router.replace("/all/all")}
        >
          <Image src={logo} alt="logo" />
        </div>
        <br />
        <div className="sidebar-flex-icon">
          <Searchbar setSideBarFlex={setSideBarFlex} />
        </div>
        <br />
        <NavItemsBar
          isFlexed={currentFlex}
          setIsFlexed={setCurrentFlex}
          title="GALLERY"
          borderClass="top-rounded"
        >
          <div className="d-flex flex-column fontPrimary align-items-center gap-2 text-2 pb-2">
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path="/gallery/all"
              title="Gallery"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path="/community"
              title="Community"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path={undefined}
              title="Favourite"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path={undefined}
              title="Requested"
            />
          </div>
        </NavItemsBar>
        <NavItemsBar
          isFlexed={currentFlex}
          setIsFlexed={setCurrentFlex}
          title="PAINTERLY"
          borderClass="botttom-rounded"
        >
          <div className="d-flex flex-column fontPrimary align-items-center gap-2 text-2 pb-2">
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path={undefined}
              title="FAQs"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path={undefined}
              title="Contact us"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path={undefined}
              title="Privacy policy"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path={undefined}
              title="About us"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path={undefined}
              title="Feedback"
            />
          </div>
        </NavItemsBar>
        <br />
        <Box
          sx={{
            position: "absolute",
            bottom: "22px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* <OutlinedButton
            type="button"
            title="New Art"
            onClick={() => setNewPost(true)}
          /> */}
          <OutlinedButton
            type="button"
            title="Log out"
            onClick={() => signOut()}
          />
        </Box>
      </div>
    </>
  );
}
