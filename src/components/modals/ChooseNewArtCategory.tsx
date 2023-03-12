import React, { useState } from "react";
import SecondaryHighlighter2 from "../highlighter/SecondaryHighlighter2";

export default function ChooseNewArtCategory({
  categories,
  categoryRef,
}: {
  categories: string[];
  categoryRef: React.MutableRefObject<string[]>;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      const newCategorySet = selectedCategories.filter(
        (categories) => categories !== category
      );
      setSelectedCategories(newCategorySet);
      categoryRef.current = newCategorySet;
      return;
    }
    const newCategorySet = [...selectedCategories, category];
    setSelectedCategories(newCategorySet);
    categoryRef.current = newCategorySet;
  };

  return (
    <div className="d-flex flex-wrap letter-spacing justify-content-center gap-4">
      {categories.map((category) => {
        return (
          <div
            key={category}
            className=" cursor d-flex align-items-center justify-content-center"
          >
            <span
              className="z-1 noselect"
              onClick={() => handleSelect(category)}
            >
              {category}
            </span>
            <span className="position-absolute">
              {selectedCategories.includes(category) && (
                <SecondaryHighlighter2 />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
