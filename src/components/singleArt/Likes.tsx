import React from "react";
import Fire from "./reactions/Fire";
import Heart from "./reactions/Heart";
import Sad from "./reactions/Sad";
import Shoked from "./reactions/Shoked";
import Smile from "./reactions/Smile";
type Props = {
  isShocked: boolean;
  hearted: boolean;
  isSad: boolean;
  fired: boolean;
  smiled: boolean;
};
export default function Likes({
  isShocked,
  hearted,
  isSad,
  smiled,
  fired,
}: Props) {
  return (
    <div className="d-flex gap-3 align-items-center justify-content-center">
      <Shoked initState={isShocked} />
      <Fire initState={fired} />
      <Heart initState={hearted} />
      <Sad initState={isSad} />
      <Smile initState={smiled} />
    </div>
  );
}
