import { firebaseTimestampToString } from "@/helperFunctions/firebaseTimestampToString";
import { Post } from "@/types/Post";
import Link from "next/link";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import SingleArtLoader from "../loader/SingleArtLoader";

export default function Card({
  data,
  handleOpenPost,
}: {
  data: Post;
  handleOpenPost: Function;
}) {
  const line = data.description;
  // const [imageCordinates, setImageCordinates] = useState<Object | null>(null);
  const art = {
    artURL: data.artURL,
    title: data.title,
    description: data.description,
    created: data.created,
  };

  return (
    <>
      <div className="card-container secondaryTransparent-bg border-radius-12">
        <div className="d-flex flex-column h-100">
          <Link href={`/art/${data.artId}`} passHref>
            <Image
              onClick={(e) =>
                handleOpenPost(e.currentTarget.getBoundingClientRect(), art)
              }
              className={`border-radius-12 card-image`}
              src={data.artURL}
              alt="art"
            />
          </Link>
          <span className="primary-color text-14 fw-bold mt-1 noselect">
            {" "}
            {data.title}
          </span>
          <span className="text-5 fontSecondary card-description mt-2 noselect">
            {line.length > 320 ? (
              <>
                {`${line.slice(0, 200)}... `}
                <Link href={`/art/${data.artId}`} passHref>
                  <span className="fontPrimary noselect cursor">read more</span>
                </Link>
              </>
            ) : (
              line
            )}
          </span>
          <div className="flex-grow-1"></div>
          <div className="fontSecondary mt-2 d-flex justify-content-between align-items-center">
            <div className="text-6 noselect ">
              {firebaseTimestampToString(data.created)}
            </div>
            <div className="text-5 noselect cursor"> #ABSTRACT</div>
          </div>
        </div>
      </div>
    </>
  );
}
