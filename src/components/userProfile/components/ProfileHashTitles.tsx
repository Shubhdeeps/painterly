import React, { useState } from "react";
import SecondaryHighlighter2 from "../../highlighter/SecondaryHighlighter2";

export default function ProfileHashTitles({
  hashTitles,
  currentPage,
  setCurrentPage,
}: {
  hashTitles: string[];
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="d-flex justify-content-start ps-2 flex-wrap gap-4 text-3 mb-4 mt-1 letter-spacing">
      {hashTitles.map((title) => (
        <div
          className="d-flex align-items-center justify-content-center"
          key={title}
        >
          <span
            className="cursor noselect z-1"
            onClick={() => setCurrentPage(title.toLowerCase())}
            key={title}
          >
            {title}
          </span>
          <span className="position-absolute z-0">
            {title.toLowerCase() === currentPage && <SecondaryHighlighter2 />}
          </span>
        </div>
      ))}
    </div>
  );
}
