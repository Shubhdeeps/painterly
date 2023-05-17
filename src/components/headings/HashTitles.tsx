import { useRouter } from "next/router";
import React from "react";
import SecondaryHighlighter from "../highlighter/SecondaryHighlighter";

export default function HashTitles({
  hashTitles,
  parentPath,
}: {
  hashTitles: string[];
  parentPath: string;
}) {
  const router = useRouter();
  const currPathName = router.asPath.split("/")[2];

  return (
    <div className="ms-2 d-flex justify-content-start flex-wrap gap-4 text-3 mb-5 letter-spacing">
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
            #{title}
          </span>
          <span className="position-absolute z-0">
            {title.toLowerCase() === currPathName && <SecondaryHighlighter />}
          </span>
        </div>
      ))}
    </div>
  );
}
