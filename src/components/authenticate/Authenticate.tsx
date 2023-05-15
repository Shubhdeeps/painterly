import { signInWithGoogle } from "@/services/auth/validateUser";
import Image from "next/image";
import React from "react";
import google from "../../assets/logo/google.png";

export default function Authenticate() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
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
