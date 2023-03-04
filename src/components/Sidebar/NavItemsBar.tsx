import React from "react";

export default function NavItemsBar({
  title,
  children,
  isFlexed,
  setIsFlexed,
  borderClass,
}: {
  title: string;
  children: any;
  isFlexed: string;
  setIsFlexed: Function;
  borderClass: string;
}) {
  return (
    <div
      className={`secondaryTransparent-bg nav-title mb-1 ${
        isFlexed === title ? "nav-items-active" : "nav-items"
      } ${borderClass}`}
      onClick={() => setIsFlexed(title)}
    >
      <div className="d-flex justify-content-between ps-3 pe-3 pt-3 fontPrimary">
        <span className="text-14 fontPrimary fw-normal text-center">
          {title}
        </span>
        {isFlexed === title ? (
          <i className="bi bi-caret-down"></i>
        ) : (
          <i className="bi bi-caret-right"></i>
        )}
      </div>
      <div className={isFlexed === title ? "nav-items-active" : "nav-items"}>
        {isFlexed === title && children}
      </div>
    </div>
  );
}
