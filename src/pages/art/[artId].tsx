import Loader from "@/components/loader/Loader";
import OutlinedButton from "@/components/Sidebar/OutlinedButton";
import Comment from "@/components/comment";
import Likes from "@/components/singleArt/Likes";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { getProfileByUID } from "@/services/firestore/profiles";
import { CommentsProps } from "@/models/Comment";
import { Post } from "@/models/Post";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Profile } from "@/models/Profile";
import {
  getCommentsOfCurrentPost,
  getGalleryPostBasedOnArtId,
} from "@/services/firestore/posts";
import { Image } from "react-bootstrap";
import { auth } from "@/services/firebaseConfig";
import CreateComment from "@/components/comment/CreateComment";

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
  const imageRef = useRef<HTMLImageElement>(null);

  if (router.isFallback) {
    return <Loader text="" />;
  }

  const currUserId = auth.currentUser?.uid;
  const authorProfile = JSON.parse(author) as Profile;
  const art = JSON.parse(data) as Post;
  const postComments = JSON.parse(comments) as CommentsProps[];

  return (
    <>
      <section className="d-flex profile-filter-container gap-2">
        <div className="d-flex flex-column p-2 gap-2 ws-100 secondary-bg border-radius-14">
          <Image
            alt="image"
            ref={imageRef}
            className={`border-radius-14 art-fullsize`}
            src={art.artURL}
          />

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div className="text-6 fontSecondary d-flex flex-column align-items-start">
              <span className="primary-color text-14 fw-bold">{art.title}</span>
              <span>{firebaseTimestampToString(art.created)}</span>
            </div>
            {currUserId && (
              <Likes
                fired={art.fire.includes(currUserId)}
                hearted={art.heart.includes(currUserId)}
                isSad={art.sadness.includes(currUserId)}
                isShocked={art.bomb.includes(currUserId)}
                smiled={art.smile.includes(currUserId)}
              />
            )}
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
          <CreateComment />
          <div className="d-flex flex-column gap-2 mb-1 pt-3">
            {postComments.map((comment) => {
              return (
                <React.Fragment key={comment.commentId}>
                  <Comment comment={comment} />
                </React.Fragment>
              );
            })}
          </div>
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
