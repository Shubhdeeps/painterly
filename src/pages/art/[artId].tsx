import React, { useRef, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import Comment from "@/components/comment";
import Likes from "@/components/singleArt/Likes";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { getProfileByUID } from "@/services/firestore/profiles";
import { CommentsProps } from "@/models/Comment";
import { Post } from "@/models/Post";
import { useRouter } from "next/router";
import { Profile } from "@/models/Profile";
import { getGalleryPostBasedOnArtId } from "@/services/firestore/posts";
import { Image } from "react-bootstrap";
import CreateComment from "@/components/comment/CreateComment";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Reactions from "@/components/reactions/Reactions";
import { getCommentsOfCurrentPost } from "@/services/firestore/post/comments";
import { updateSadness } from "@/services/firestore/testing/testing";

export default function Page({
  data,
  comments,
  author,
}: {
  data: string;
  comments: string;
  author: string;
}) {
  const router = useRouter();
  const [seeAll, setSeeAll] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const commentRef = useRef<HTMLDivElement | null>(null);
  if (router.isFallback) {
    return <Loader text="" />;
  }
  const authorProfile = JSON.parse(author) as Profile;
  const art = JSON.parse(data) as Post;
  const postComments = JSON.parse(comments) as CommentsProps[];
  const sliceNum = seeAll ? postComments.length : 5;
  return (
    <>
      <section
        className="d-flex profile-filter-container gap-2"
        id="art-section"
      >
        <div className="d-flex flex-column p-2 gap-2 ws-100 secondary-bg border-radius-14">
          <Image
            alt="image"
            ref={imageRef}
            className={`border-radius-14 art-fullsize`}
            src={art.artURL}
          />

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <Reactions
              shocked={art.shocked}
              fire={art.fire}
              heart={art.heart}
              sad={art.sad}
              smile={art.smile}
              postId={art.artId}
            />
            <div className="text-6 fontSecondary d-flex flex-column align-items-end">
              <span className="primary-color text-14 fw-bold">{art.title}</span>
              <span>{firebaseTimestampToString(art.created)}</span>
            </div>
          </div>
          <span className="text-5 fontSecondary mt-2">{art.description}</span>
          <div className="fw-bold fontSecondary text-5">
            {art.category.map((cat) => {
              if (cat === "all") {
                return <></>;
              }
              return <span key={cat}> #{cat.toUpperCase()}</span>;
            })}
          </div>
          <hr />
          <CreateComment postId={art.artId} commentsParentRef={commentRef} />
          <div className="d-flex flex-column gap-1 mb-1 pt-3" ref={commentRef}>
            {postComments.slice(0, sliceNum).map((comment) => {
              return (
                <React.Fragment key={comment.commentId}>
                  <Comment comment={comment} highlighted={false} />
                </React.Fragment>
              );
            })}
          </div>
          {!seeAll && !!postComments.length && (
            <IconButton
              disableRipple
              disableTouchRipple
              disableFocusRipple
              size="small"
              sx={{
                outline: "none !important",
                width: "140px",
                my: 1,
              }}
              color="info"
              onClick={() => setSeeAll(true)}
            >
              See all
            </IconButton>
          )}
        </div>
        <ProfileInfo
          uid={authorProfile.uid}
          name={authorProfile.displayName}
          imageURL={authorProfile.profileURL}
          description={authorProfile.description}
          currentUserProfile={false}
        />
      </section>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const singleArt = await getGalleryPostBasedOnArtId(params.artId);
  const comments = await getCommentsOfCurrentPost(params.artId);
  let author;
  if (!!singleArt) {
    const authorId = singleArt.authorId! as string;
    author = await getProfileByUID(authorId);
  }
  return {
    props: {
      data: JSON.stringify(singleArt),
      comments: JSON.stringify(comments),
      author: JSON.stringify(author),
    },
  };
}
