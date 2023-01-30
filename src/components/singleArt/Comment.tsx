import React from "react";
import Extension from "../extension/Index";
import Member from "../userProfile/Member";

type Props = {
  comment: {
    author: {
      name: string;
      profileURL: string | undefined;
    };
    date: string;
    commentText: string;
    isMentor: boolean;
  };
};
export default function Comment({ comment }: Props) {
  return (
    <span className="secondaryTransparent-bg p-3 border-radius-14 d-flex flex-column align-items-start gap-2">
      <div className="d-flex align-items-start justify-content-between w-100">
        <Member
          size="sm"
          src={comment.author.profileURL}
          title={comment.author.name}
          date={comment.date}
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
