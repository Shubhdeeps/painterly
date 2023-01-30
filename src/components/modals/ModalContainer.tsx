import React from "react";
import InputTextArea from "../inputFields/InputTextArea";
import InputTextField from "../inputFields/InputTextField";

export default function ModalContainer() {
  const title = "Modal title";
  return (
    <div className="modal-container secondary-bg border-radius-14 fontPrimary">
      <span>{title}</span>
      <InputTextField placeholder="Comment title" icon={undefined} />
      <br />
      <InputTextArea placeholder="Comment title" icon={undefined} />
    </div>
  );
}
