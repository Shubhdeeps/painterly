import React, { useState } from "react";
import SecondaryHighlighter2 from "../highlighter/SecondaryHighlighter2";

export default function ChooseNewArtCategory({
  categories,
  categoryRef,
}: {
  categories: string[];
  categoryRef: React.MutableRefObject<string>;
}) {
  const [isSelected, setSelected] = useState(categories[0]);

  const handleSelect = (category: string) => {
    setSelected(category);
    categoryRef.current = category;
  };

  return (
    <div className="d-flex flex-wrap letter-spacing justify-content-center gap-4">
      {categories.map((category) => {
        return (
          <div
            key={category}
            className=" cursor d-flex align-items-center justify-content-center"
          >
            <span className="z-1" onClick={() => handleSelect(category)}>
              {category}
            </span>
            <span className="position-absolute">
              {isSelected === category && <SecondaryHighlighter2 />}
            </span>
          </div>
        );
      })}
    </div>
  );
}
