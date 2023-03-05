import React from "react";
import Header from "./headings/Header";

export default function All() {
  return (
    <>
      <Header title="GALLERY" />
      <div className="d-flex gap-4 text-3 mb-5 letter-spacing">
        <span>#All</span>
        <span>#Abstract</span>
        <span>#Colorful</span>
        <span>#OilPainting</span>
        <span>#Pencil</span>
        <span>#Anime</span>
      </div>
      {/* <CardGrid /> */}
    </>
  );
}
