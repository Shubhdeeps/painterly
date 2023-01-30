import { useRouter } from "next/router";
import React from "react";
import SecondaryHighlighter2 from "../highlighter/SecondaryHighlighter2";

export default function ProfileHashTitles({
  hashTitles,
  parentPath,
}: {
  hashTitles: string[];
  parentPath: string;
}) {
  const router = useRouter();
  const { filter } = router.query;

  return (
    <div className="d-flex justify-content-start ps-2 flex-wrap gap-4 text-3 mb-4 letter-spacing">
      {hashTitles.map((title) => (
        <div
          className="d-flex align-items-center justify-content-center"
          key={title}
        >
          <span
            className="cursor noselect z-1"
            onClick={() => router.push(`/${parentPath}/${title.toLowerCase()}`)}
            key={title}
          >
            {title}
          </span>
          <span className="position-absolute z-0">
            {title.toLowerCase() === filter && <SecondaryHighlighter2 />}
          </span>
        </div>
      ))}
    </div>
  );
}
