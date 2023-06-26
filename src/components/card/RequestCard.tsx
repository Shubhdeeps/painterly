import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { ArtRequests } from "@/models/Requests";

type Props = {
  data: ArtRequests;
  handleOpenPost: Function;
};
function RequestCard({ data, handleOpenPost }: Props) {
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

  const art = {
    artURL: data.artURL,
    created: data.created,
  };

  const isAssigned = !!data.assigneeId;

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
          <span className="text-6 fontSecondary noselect">
            Requested {firebaseTimestampToString(data.created)}
          </span>
          <span className="text-6 fontSecondary noselect">
            Status {data.resolved}
          </span>
        </div>
      </div>
    </>
  );
}

export default RequestCard;
