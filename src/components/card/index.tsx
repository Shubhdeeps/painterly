import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { Post } from "@/models/Post";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useInView } from "react-intersection-observer";

type Props = {
  data: Post;
  handleOpenPost: Function;
};
function Card({ data, handleOpenPost }: Props) {
  const [isviewed, setIsViewed] = useState(false);
  //for infinite scroll
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isviewed && setIsViewed(true);
    }
  }, [inView, isviewed]);

  const line = data.description;
  const art = {
    artURL: data.artURL,
    title: data.title,
    description: data.description,
    created: data.created,
  };

  return (
    <>
      <div
        ref={ref}
        className={`card-container secondaryTransparent-bg border-radius-12 ${
          isviewed ? "entry-onview" : "exit-onview"
        }`}
      >
        <Link href={`/art/${data.artId}`} passHref>
          <Image
            onClick={(e) =>
              handleOpenPost(e.currentTarget.getBoundingClientRect(), art)
            }
            className={`card-image`}
            src={data.artURL}
            alt="art"
          />
        </Link>
        <div className="d-flex flex-column h-100 card_body">
          <span className="primary-color text-14 fw-bold mt-1 noselect">
            {data.title}
          </span>
          <span className="text-6 fontSecondary noselect">
            {firebaseTimestampToString(data.created)}
          </span>
          <span className="text-5 fontSecondary card-description noselect">
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
          <div className="border-btm"></div>

          <div className="text-5 noselect cursor d-flex justify-content-start gap-2">
            {!!data.category &&
              data.category.map((cat) => {
                if (cat === "all") {
                  return null;
                }
                return (
                  <Link href={`/all/${cat}`} passHref key={cat}>
                    <span className="fw-bold  fontSecondary hover-primary">
                      #{cat.toUpperCase()}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
