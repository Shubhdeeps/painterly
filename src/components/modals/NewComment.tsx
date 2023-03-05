import React from "react";
import InputTextArea from "../inputFields/InputTextArea";
import OutlinedButton from "../Sidebar/OutlinedButton";
import Member from "../userProfile/Member";

export default function NewComment() {
  return (
    <div className="modal-bg">
      <div className="modal-container secondary-bg border-radius-14 fontPrimary d-flex flex-column gap-3">
        <Member
          date={undefined}
          size="md"
          title="Johnson Smith"
          src={undefined}
        />
        <InputTextArea icon={undefined} placeholder="Write your comment!" />
        <div className="d-flex justify-content-end">
          <OutlinedButton title="Comment" onClick={() => console.log("")} />
        </div>
      </div>
    </div>
  );
}
