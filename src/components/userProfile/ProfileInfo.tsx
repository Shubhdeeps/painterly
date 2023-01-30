import React from "react";
import { Image } from "react-bootstrap";
import OutlinedButton from "../Sidebar/OutlinedButton";

type Props = {
  name: string;
  username: string;
  imageURL: string;
  description: string | undefined;
  currentUserProfile: boolean;
};
export default function ProfileInfo({
  name,
  username,
  imageURL,
  description,
  currentUserProfile,
}: Props) {
  return (
    <div className="profile-container">
      <div className="d-flex flex-column gap-2 profile-container-child">
        <div className="profile-card secondary-bg border-radius-14">
          <Image
            src={imageURL}
            className="profile-card-image border-radius-14"
            alt="pfp"
          />
          <div className="card-details">
            <span className="fontPrimary text-3 ">{name}</span>
            <span className="fontSecondary mt--1">{username}</span>
            {description && (
              <span className="fontSecondary text-5 mt-2">{description}</span>
            )}
            {currentUserProfile && (
              <span className="mt-4">
                <OutlinedButton title="Edit" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
