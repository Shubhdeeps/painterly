import React, { useRef, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import Comment from "@/components/comment";
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
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// ui components
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import {
  doesCurrArtFavoriteByCurrUser,
  updateUserFavorite,
} from "@/services/realtimeDB/userFavorites";

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
  const [isFavByCurrUser, setIsFavByCurrUser] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const commentRef = useRef<HTMLDivElement | null>(null);
  const art = JSON.parse(data) as Post;
  useEffect(() => {
    (async () => {
      if (art.artId) {
        const favStatus = await doesCurrArtFavoriteByCurrUser(art.artId);
        setIsFavByCurrUser(favStatus);
      }
    })();
  }, [art.artId]);

  if (router.isFallback) {
    return <Loader text="" />;
  }
  const authorProfile = JSON.parse(author) as Profile;
  const postComments = JSON.parse(comments) as CommentsProps[];
  const sliceNum = seeAll ? postComments.length : 5;

  const handleChangeFavorite = (state: boolean) => {
    setIsFavByCurrUser(state);
    // update in db
    updateUserFavorite(state ? "ADD" : "REMOVE", art.artId);
  };
  return (
    <>
      <Box
        display="flex"
        gap={2}
        className="profile-filter-container"
        id="art-section"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 2,
          }}
          className="ws-100 secondary-bg border-radius-14"
        >
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
              artAuthorId={art.authorId}
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
          <span>
            <IconButton
              sx={{
                color: "secondary.main",
                gap: 1,
                outline: "none !important",
                borderRadius: "10px !important",
              }}
              size="small"
              onClick={() => handleChangeFavorite(!isFavByCurrUser)}
            >
              {isFavByCurrUser ? (
                <>
                  <StarIcon />
                  Remove from favorite
                </>
              ) : (
                <>
                  <StarBorderIcon />
                  Add to favorite
                </>
              )}
            </IconButton>
          </span>
          <hr />
          <CreateComment
            postId={art.artId}
            commentsParentRef={commentRef}
            postAuthorId={art.authorId}
          />

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
        </Box>
        <ProfileInfo
          uid={authorProfile.uid}
          name={authorProfile.displayName}
          imageURL={authorProfile.profileURL}
          description={authorProfile.description}
          currentUserProfile={false}
        />
      </Box>
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
