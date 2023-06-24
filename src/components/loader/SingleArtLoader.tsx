import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { Timestamp } from "@/services/firebaseConfig";

import React, { useState, useEffect, useImperativeHandle } from "react";
import { Image } from "react-bootstrap";

type Cordinates = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};
type TempArt = {
  artURL: string;
  title: string;
  description: string;
  created: Timestamp;
};
export default function SingleArtLoader({
  art,
  cordinates,
}: {
  art: TempArt;
  cordinates: Cordinates;
}) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (cordinates) {
      setStartAnimation(true);
    }
  }, [cordinates]);
  console.log(cordinates);
  if (!cordinates) return null;

  return (
    <>
      <section className="d-flex profile-filter-container gap-2 z-2 popup-width container">
        <div
          style={{ marginTop: window.pageYOffset }}
          className="d-flex flex-column p-2 gap-2 ws-100 secondary-bg border-radius-14 height-flex"
        >
          <style jsx global>{`
          .bg-color{

          }
          .height-flex {
            height: ${startAnimation ? "100%" : "50px"}
            overflow-x: hidden;
          }
          .small-flex {
            position: absolute;
            left: ${cordinates.left - cordinates.width + 30}px;
            top: ${cordinates.top - 128}px;
            width=${cordinates.width}px; 
            height=${cordinates.height}px;
            transition: 0.2s ease-in;
          }
          .image-flex {
            transition: 0.2s ease-in;
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            left: 0px !important;
            top: 0px !important;
            margin: 0px !important;
          }
        `}</style>
          <Image
            width={`${cordinates.width}px`}
            height={`${cordinates.height}px`}
            src={art.artURL}
            alt="image"
            className={`border-radius-14 ${
              startAnimation ? "image-flex" : "small-flex"
            }`}
          />
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="text-6 fontSecondary d-flex flex-column align-items-start">
              <span className="primary-color text-14 fw-bold">{art.title}</span>
              <span>{firebaseTimestampToString(art.created)}</span>
            </div>
            {/* <Likes /> */}
          </div>
          <span className="text-5 fontSecondary mt-2">{art.description}</span>
          <span className="fw-bold fontSecondary text-5">
            {/* #{art.category.toUpperCase()} */}
          </span>
          <hr />
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <span className="text-5"></span>
            <div className="d-flex flex-coloumn gap-2 flex-wrap justify-content-center"></div>
          </div>
        </div>
      </section>
      <div className="position-absolute w-100 h-100 body-bg"></div>
    </>
  );
}
