// import { signInWithGoogle } from "@/services/auth/validateUser";
import Image from "next/image";
import React, { useEffect } from "react";
import google from "../../assets/logo/google.png";
import {
  signInAnonymously,
  signInWithGoogle,
} from "@/services/auth/validateUser";

export default function Authenticate() {
  return (
    <div
      className="d-flex flex-column gap-4 justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <div
        onClick={signInAnonymously}
        className="cursor secondaryTransparent-bg fontPrimary p-2 ps-3 pe-3 border-r1 width-320 d-flex justify-content-between"
      >
        <span>Enter Anonymously </span>
      </div>

      <div
        onClick={signInWithGoogle}
        className="cursor secondaryTransparent-bg fontPrimary p-2 ps-3 pe-3 border-r1 width-320 d-flex justify-content-between"
      >
        <span>Login with Google </span>
        <Image width={25} src={google} alt="logo" />
      </div>
      {/* <Button onClick={() => handleSignIn()}>Login</Button> */}
    </div>
  );
}
