import React from "react";
import { Spinner } from "react-bootstrap";
import Loader from "../loader/Loader";

export default function OutlinedButton({
  title,
  onClick,
  type,
}: {
  title: string | "Element";
  onClick: Function;
  type: "button" | "submit";
}) {
  if (title === "Element") {
    return (
      <div className="share-art-loader border-radius-50 p-1 text-center">
        <div className="spinner-border spinner-border-sm" role="status"></div>
        <span> Posting </span>
      </div>
    );
  }
  return (
    <input
      className="border-radius-50 p-1 share-art-button "
      onClick={() => onClick()}
      type={type}
      value={title}
    />
  );
}
