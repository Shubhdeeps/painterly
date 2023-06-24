import React from "react";
import { Image } from "react-bootstrap";
import Link from "next/link";

type Props = {
  src: string | null | undefined;
  title: string;
  date?: string;
  size: "sm" | "md" | "lg";
  uid: string;
};
export default function Member({ src, title, date, size, uid }: Props) {
  return (
    <Link href={`/profile/${uid}`}>
      <div className="d-flex align-items-center gap-2 noselect cursor">
        {src ? (
          <Image src={src} alt="pfp" className={`border-radius-50 ${size}`} />
        ) : (
          <div
            className={`fontSecondary border-radius-50 ${size} secondaryTransparent-bg d-flex justify-content-center align-items-center`}
          >
            {title.split("")[0]}
          </div>
        )}
        <div className="d-flex flex-column align-items-start">
          <span className={size === "md" ? "text-4" : "text-5"}>{title}</span>
          {date && <span className="fontSecondary text-6">{date}</span>}
        </div>
      </div>
    </Link>
  );
}
