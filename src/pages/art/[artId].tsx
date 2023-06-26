import React, { useRef, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import Comment from "@/components/comment";
import { getProfileByUID } from "@/services/firestore/profiles";
import { CommentsProps } from "@/models/Comment";
import { Post } from "@/models/Post";
import { useRouter } from "next/router";
import { Profile } from "@/models/Profile";
import { getGalleryPostBasedOnArtId } from "@/services/firestore/post/posts";
import { Image } from "react-bootstrap";
import CreateComment from "@/components/comment/CreateComment";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { getCommentsOfCurrentPost } from "@/services/firestore/post/comments";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

// ui components
import Box from "@mui/material/Box";
import {
  doesCurrArtFavoriteByCurrUser,
  updateUserFavorite,
} from "@/services/realtimeDB/userFavorites";

import NameAndReactionsWeb from "@/components/singleArt/NameAndReactions";
import NameAndReactionsMobile from "@/components/singleArt/NameAndReactionMobile";
import { Typography } from "@mui/material";
import SelectMenu from "@/components/inputFields/SelectMenu";
import { auth } from "@/services/firebaseConfig";
import ArtDeleteConfirmation from "@/components/modals/DeleteConfirmation";
import { createNewRequestPost } from "@/services/firestore/post/requests/createNewRequestPost";

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
  const [open, setOpen] = useState("");
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
  const currUserId = auth.currentUser?.uid;

  const artAuthorIs = currUserId === art.authorId ? "self" : "other";
  const handleChangeFavorite = (state: boolean) => {
    setIsFavByCurrUser(state);
    // update in db
    updateUserFavorite(state ? "ADD" : "REMOVE", art.artId);
  };

  //update the options for delete dialog confirmation
  const options = {
    self: [
      { value: "Request review", action: () => createNewRequestPost(art) },
      { value: "Delete", action: () => setOpen(art.artId) },
    ],
    other: [{ value: "Report art", action: () => alert("Reported!") }],
  };
  const classNameForWidth = window.innerWidth < 1000 ? "w-100" : "ws-100";

  return (
    <>
      <ArtDeleteConfirmation open={!!open} setOpen={setOpen} />
      <Box display="flex" gap={2} id="art-section">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
            gap: 1,
            position: "relative",
          }}
          className={`secondary-bg border-radius-14 ${classNameForWidth}`}
        >
          <SelectMenu list={options[artAuthorIs]} />
          <Image
            alt="image"
            ref={imageRef}
            className={`border-radius-14 art-fullsize`}
            src={art.artURL}
          />

          <NameAndReactionsWeb art={art} authorProfile={authorProfile} />
          <NameAndReactionsMobile art={art} authorProfile={authorProfile} />
          <Typography
            sx={{
              height: "fit-content",
              fontSize: {
                xs: "16px",
                sm: "20px",
              },
              fontWeight: 800,
            }}
            className="primary-color"
          >
            {art.title}
          </Typography>
          <span className="text-5 fontSecondary">{art.description}</span>
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
                  <Comment
                    currUserId={currUserId}
                    comment={comment}
                    highlighted={false}
                  />
                </React.Fragment>
              );
            })}
          </div>
          {!seeAll && !!postComments.length && postComments.length > 5 && (
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
