import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { CommentsProps } from "@/models/Comment";
import React from "react";
import Extension from "../extension/Index";
import Member from "../userProfile/Member";

export default function Comment({ comment }: { comment: CommentsProps }) {
  return (
    <span className="secondaryTransparent-bg p-3 border-radius-14 d-flex flex-column align-items-start gap-2">
      <div className="d-flex align-items-start justify-content-between w-100">
        <Member
          size="sm"
          src={comment.author.profileURL}
          title={comment.author.name}
          date={firebaseTimestampToString(comment.date)}
        />
        <Extension icon="bi-three-dots-vertical">
          <div className="p-2 ps-5 pe-5">
            <span className="cursor noselect fontSecondary"> Delete </span>
          </div>
        </Extension>
      </div>
      <span className="text-5 fontPrimary fw-light">{comment.commentText}</span>
    </span>
  );
}
