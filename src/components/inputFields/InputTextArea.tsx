import React from "react";

export default function InputTextArea({
  placeholder,
  icon,
}: {
  placeholder: string;
  icon: string | undefined;
}) {
  return (
    <div className="secondaryTransparent-bg height-152 border-radius-14 d-flex align-items-center gap-2 pt-1 ps-3 pe-2">
      {icon && <i className={`bi ${icon} fontSecondary text-4`}></i>}
      <textarea
        className="input-search-field"
        placeholder={placeholder}
        rows={4}
      />
    </div>
  );
}
