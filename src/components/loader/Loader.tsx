import React from "react";

export default function Loader({ text }: { text: string }) {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 fontPrimary position-absolute w-100 h-100 ">
      <span>{!!text && text}</span>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
