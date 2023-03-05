import Loader from "@/components/loader/Loader";
import OutlinedButton from "@/components/Sidebar/OutlinedButton";
import Art from "@/components/singleArt/Art";
import Comment from "@/components/singleArt/Comment";
import Likes from "@/components/singleArt/Likes";
import ProfileInfo from "@/components/userProfile/ProfileInfo";
import { firebaseTimestampToString } from "@/services/helperFunctions/firebaseTimestampToString";
import { getProfileByUID } from "@/services/firestore/profiles";
import { CommentsProps } from "@/models/Comment";
import { Post } from "@/models/Post";
import { useRouter } from "next/router";
import React from "react";
import { Profile } from "@/models/Profile";
import {
  getCommentsOfCurrentPost,
  getGalleryPostBasedOnArtId,
} from "@/services/firestore/posts";

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
  if (router.isFallback) {
    return <Loader text="" />;
  }
  const authorProfile = JSON.parse(author) as Profile;
  const art = JSON.parse(data) as Post;
  const postComments = JSON.parse(comments) as CommentsProps[];
  return (
    <section className="d-flex profile-filter-container gap-2">
      <div className="d-flex flex-column p-2 gap-2 ws-100 secondary-bg border-radius-14">
        <Art src={art.artURL} />
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="text-6 fontSecondary d-flex flex-column align-items-start">
            <span className="primary-color text-14 fw-bold">{art.title}</span>
            <span>{firebaseTimestampToString(art.created)}</span>
          </div>
          <Likes />
        </div>
        <span className="text-5 fontSecondary mt-2">{art.description}</span>
        <span className="fw-bold fontSecondary text-5">
          {/* #{art.category.toUpperCase()} */} #ABSTRACT
        </span>
        <hr />
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <span className="text-5">Comments</span>
          <div className="d-flex flex-coloumn gap-2 flex-wrap justify-content-center">
            <OutlinedButton
              title="Add Comment"
              onClick={() => console.log("add comment")}
            />
            <OutlinedButton
              title="Request Review"
              onClick={() => console.log("hello")}
            />
          </div>
        </div>
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
  );
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: { artId: "5eeb23e-c6bc-7072-83c6-503d7db0eb5" },
//       },
//     ],
//     fallback: true,
//   };
// }

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
