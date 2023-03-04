import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { NavButton } from "./NavButton";
import NavItemsBar from "./NavItemsBar";
import { useRouter } from "next/router";
import OutlinedButton from "./OutlinedButton";
import Searchbar from "../topbar/Searchbar";
import { signOut } from "@/services/auth/validateUser";

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
              path="/all/all"
              title="All"
            />
            <NavButton
              setSideBarFlex={setSideBarFlex}
              path="/friends"
              title="Friends"
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
          <div className="d-flex flex-column fontPrimary align-items-center gap-2 mt-4 text-2 pb-2">
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
        <div className="w-100 d-flex justify-content-center mt-4">
          <OutlinedButton
            title="New Art"
            onClick={() => console.log("new art")}
          />
          <OutlinedButton title="Log out" onClick={() => signOut()} />
        </div>
      </div>
    </>
  );
}
