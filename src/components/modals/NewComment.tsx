import React, { useRef } from "react";
import InputTextArea from "../inputFields/InputTextArea";
import OutlinedButton from "../Sidebar/OutlinedButton";
import Member from "../userProfile/components/Member";

export default function NewComment() {
  const commentRf = useRef("");
  return (
    <div className="modal-bg">
      <form className="modal-container secondary-bg border-radius-14 fontPrimary d-flex flex-column gap-3">
        <Member
          date={undefined}
          size="md"
          title="Johnson Smith"
          src={undefined}
        />
        <InputTextArea
          textRef={commentRf}
          icon={undefined}
          placeholder="Write your comment!"
        />
        <div className="d-flex justify-content-end">
          <OutlinedButton
            type="submit"
            title="Comment"
            onClick={() => console.log("")}
          />
        </div>
      </form>
    </div>
  );
}
