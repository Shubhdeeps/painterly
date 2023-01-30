import React from "react";
import { Image } from "react-bootstrap";

type Props = {
  src: string;
};
export default function Art({ src }: Props) {
  return (
    <>
      <Image className="border-radius-14 art-fullsize" src={src} alt="art" />
    </>
  );
}
