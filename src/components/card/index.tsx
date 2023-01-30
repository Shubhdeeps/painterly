import React from "react";
import { Image } from "react-bootstrap";
const line = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
`;
export default function Card({ imageURL }: { imageURL: string }) {
  return (
    <div className="card-container secondaryTransparent-bg border-radius-12">
      <div className="d-flex flex-column h-100">
        <Image
          className="border-radius-12 card-image"
          src={imageURL}
          alt="art"
        />
        <span className="primary-color text-14 fw-bold mt-1">
          {" "}
          This is a card title
        </span>
        <span className="text-5 fontSecondary card-description mt-2">
          {line.length > 320 ? (
            <>
              {`${line.slice(0, 200)}... `}
              <span className="fontPrimary noselect cursor">read more</span>
            </>
          ) : (
            line
          )}
        </span>
        <div className="flex-grow-1"></div>
        <div className="fontSecondary mt-2 d-flex justify-content-between align-items-center">
          <div className="text-6 noselect "> 14 days ago</div>
          <div className="text-5 noselect cursor"> #ABSTRACT</div>
        </div>
      </div>
    </div>
  );
}
