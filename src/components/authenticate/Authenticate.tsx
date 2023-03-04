import { signInWithGoogle } from "@/services/auth/validateUser";
import React from "react";
import { Button } from "react-bootstrap";

export default function Authenticate() {
  const handleSignIn = async () => {
    signInWithGoogle();
  };
  return (
    <div>
      <Button onClick={() => handleSignIn()}>Login</Button>
    </div>
  );
}
