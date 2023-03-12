import React from "react";

export default function InputTextField({
  placeholder,
  icon,
  textRef,
}: {
  placeholder: string;
  icon: string | undefined;
  textRef: React.MutableRefObject<string>;
}) {
  return (
    <div className="secondaryTransparent-bg height-52 border-radius-14 d-flex align-items-center gap-2 ps-3 pe-2">
      {icon && <i className={`bi ${icon} fontSecondary text-4`}></i>}
      <input
        type="text"
        className="input-search-field"
        placeholder={placeholder}
        onChange={(e) => (textRef.current = e.target.value)}
      />
    </div>
  );
}
