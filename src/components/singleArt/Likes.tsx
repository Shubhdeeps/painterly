import React from "react";
import Fire from "./reactions/Fire";
import Heart from "./reactions/Heart";
import Sad from "./reactions/Sad";
import Shoked from "./reactions/Shoked";
import Smile from "./reactions/Smile";

export default function Likes() {
  return (
    <div className="d-flex gap-3 align-items-center justify-content-center">
      <Shoked initState={false} />
      <Fire initState={true} />
      <Heart initState={true} />
      <Sad initState={false} />
      <Smile initState={true} />
    </div>
  );
}
