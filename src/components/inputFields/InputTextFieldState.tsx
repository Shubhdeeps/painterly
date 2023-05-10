import React from "react";

export default function InputTextFieldProps(props: any) {
  return (
    <div className="secondaryTransparent-bg height-52 border-radius-14 d-flex align-items-center gap-2 ps-3 pe-2">
      <input type="text" className="input-search-field" {...props} />
    </div>
  );
}
