import React, { useRef } from "react";
import InputTextArea from "../inputFields/InputTextArea";
import InputTextField from "../inputFields/InputTextField";

export default function ModalContainer() {
  const title = "Modal title";
  const commentRef = useRef("");
  const commentRef2 = useRef("");
  return (
    <div className="modal-container secondary-bg border-radius-14 fontPrimary">
      <span>{title}</span>
      <InputTextField
        textRef={commentRef}
        placeholder="Comment title"
        icon={undefined}
      />

      <br />
      <InputTextArea
        textRef={commentRef2}
        placeholder="Comment title"
        icon={undefined}
      />
    </div>
  );
}
