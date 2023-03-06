import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { Timestamp } from "@/services/firebaseConfig";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
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
function SingleArtExitLoader({ art }: { art: TempArt }, ref: any) {
  const [modalCordinates, setModalCordinate] = useState<Cordinates | null>(
    null
  );
  const [startAnimation, setStartAnimation] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: (cordinates: Cordinates) => {
      setModalCordinate(cordinates);
    },
  }));

  useEffect(() => {
    if (modalCordinates) {
      setStartAnimation(true);
    }
  }, [modalCordinates]);

  if (!modalCordinates) return null;

  return (
    <>
      <section className="d-flex profile-filter-container gap-2 z-2 popup-width container position-fixed">
        <div
          //   style={{ marginTop: window.pageYOffset }}
          className="d-flex flex-column p-2 gap-2 ws-100 border-radius-14 height-flex"
        >
          <style jsx global>{`
            .bg-color {
            }
            .height-flex {
              overflow-x: hidden;
            }
            .image-flex {
              transition: 0.4s ease-in;
              width: 100% !important;
              height: auto !important;
              left: 0px !important;
              top: 0px !important;
              margin: 0px !important;
              overflow: hidden;
            }
            .small-flex {
              position: relative;
              width: 10% !important;
              top: 0px !important;
              left: 0px !important;
              z-index: 3;
              transition: 0.4s ease-in;
            }
          `}</style>
          <div className="image-flex position-relative">
            <Image
              src={art.artURL}
              alt="image"
              className={`border-radius-14 ${
                startAnimation ? "small-flex" : "image-flex position-absolute"
              }`}
            />
          </div>
        </div>
      </section>
      <div className="position-absolute w-100 h-100 body-g"></div>
    </>
  );
}

export default forwardRef(SingleArtExitLoader);
