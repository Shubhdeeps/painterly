import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { NavButton } from "./NavButton";
import NavItemsBar from "./NavItemsBar";
import { useRouter } from "next/router";
import OutlinedButton from "./OutlinedButton";
import Searchbar from "../topbar/Searchbar";

const paths: { [title: string]: "GALLERY" | "PAINTERLY" } = {
  all: "GALLERY",
  friends: "GALLERY",
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
  const router = useRouter();
  const currPathCategory = paths[router.asPath.split("/")[1]];

  const [currentFlex, setCurrentFlex] = useState(currPathCategory);

  return (
    <>
      <div className={`sidebar secondary-bg ${!sideBarFlex && "sidebar-flex"}`}>
        <div className="d-flex justify-content-end">
          <i
            className="bi bi-x-lg sidebar-flex-icon fontSecondary cursor text-2"
            onClick={() => setSideBarFlex(false)}
          ></i>
        </div>
        <Image src={logo} alt="logo" />
        <br />
        <div className="sidebar-flex-icon">
          <Searchbar />
        </div>
        <br />
        <br />
        <NavItemsBar
          isFlexed={currentFlex}
          setIsFlexed={setCurrentFlex}
          title="GALLERY"
          borderClass="top-rounded"
        >
          <div className="d-flex flex-column fontPrimary align-items-center gap-2 text-2 pb-2">
            <NavButton path="/all/all" title="All" />
            <NavButton path="/friends" title="Friends" />
            <NavButton path={undefined} title="Favourite" />
            <NavButton path={undefined} title="Requested" />
          </div>
        </NavItemsBar>
        <NavItemsBar
          isFlexed={currentFlex}
          setIsFlexed={setCurrentFlex}
          title="PAINTERLY"
          borderClass="botttom-rounded"
        >
          <div className="d-flex flex-column fontPrimary align-items-center gap-2 mt-4 text-2 pb-2">
            <NavButton path={undefined} title="FAQs" />
            <NavButton path={undefined} title="Contact us" />
            <NavButton path={undefined} title="Privacy policy" />
            <NavButton path={undefined} title="About us" />
            <NavButton path={undefined} title="Feedback" />
          </div>
        </NavItemsBar>
        <div className="w-100 d-flex justify-content-center mt-4">
          <OutlinedButton title="New Art" />
        </div>
      </div>
    </>
  );
}
