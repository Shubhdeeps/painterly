import Link from "next/link";
import React from "react";
import { Image } from "react-bootstrap";
import OutlinedButton from "../Sidebar/OutlinedButton";

type Props = {
  name: string;
  imageURL: string | null;
  description: string | null;
  currentUserProfile: boolean;
  uid: string;
};
export default function ProfileInfo({
  name,
  imageURL,
  description,
  currentUserProfile,
  uid,
}: Props) {
  return (
    <div className="profile-container">
      <div className="d-flex flex-column gap-2 profile-container-child">
        <div className="profile-card secondary-bg border-radius-14">
          {imageURL ? (
            <Link href={`/profile/${uid}/`} passHref>
              <Image
                src={imageURL}
                className="profile-card-image border-radius-14"
                alt="pfp"
              />
            </Link>
          ) : (
            <div className="profile-card-image border-radius-14">
              {name.charAt(0)}
            </div>
          )}
          <div className="card-details">
            <span className="fontPrimary text-3 ">{name}</span>
            {/* <span className="fontSecondary mt--1">{username}</span> */}
            {description && (
              <span className="fontSecondary text-5 mt-2">{description}</span>
            )}
            {currentUserProfile && (
              <span className="mt-4">
                <OutlinedButton
                  title="Edit"
                  onClick={() => console.log("click")}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
