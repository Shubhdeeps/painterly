import { Timestamp, firestore, timestamp } from "@/services/firebaseConfig";
import { Post } from "@/models/Post";
import { collectionRef } from "./collectionOperations";

const AMOUNT_TO_BE_FETCHED = 10;
export const getAllPosts = async (
  lastPostDate: Timestamp | undefined,
  filter: string
) => {
  try {
    let firstPostTime = timestamp;
    if (lastPostDate) {
      firstPostTime = lastPostDate;
    }
    const docs: Post[] = [];
    await collectionRef.gallery
      .orderBy("created", "desc")
      .startAfter(firstPostTime)
      .limit(AMOUNT_TO_BE_FETCHED)
      .get()
      .then((response) => {
        response.docs.forEach((doc) => {
          const data = doc.data();
          docs.push(data);
        });
      })
      .catch((err) => console.log(err));
    return docs;
  } catch (e) {
    console.log(e);
  }
};

import { usersCached } from "@/services/caching/caching";
import { Comment, CommentsProps } from "@/models/Comment";

export const getCommentsOfCurrentPost = async (postId: string) => {
  try {
    const commentsDocs = await firestore
      .collection("gallery")
      .doc(postId)
      .collection("comments")
      .orderBy("created", "asc")
      .get();
    const comments = commentsDocs.docs.map(
      (comment) => comment.data() as Comment
    );
    const authorIds = comments.map((comment) => comment.authorId);
    const uidsToBeFetched: string[] = [];

    for (const uid of authorIds) {
      if (!usersCached[uid]) {
        uidsToBeFetched.push(uid);
      }
    }

    const userProfileDocs = await Promise.all(
      uidsToBeFetched.map((uid) => collectionRef.profile.doc(uid).get())
    );
    const profiles = userProfileDocs.map((doc) => doc.data());

    //caching fetched profiles
    profiles.forEach((profile) => {
      if (profile) {
        usersCached[profile.uid] = {
          displayName: profile.displayName,
          profileURL: profile.profileURL,
        };
      }
    });

    const data: CommentsProps[] = comments.map((comment) => {
      return {
        author: {
          name: usersCached[comment.authorId].displayName,
          profileURL: usersCached[comment.authorId].profileURL,
        },
        commentText: comment.commentText,
        date: comment.created,
        isMentor: false,
        commentId: comment.commentId,
      };
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export async function getGalleryPostBasedOnArtId(
  artId: string
): Promise<Post | ""> {
  let err;
  let art: Post | "" = "";
  await collectionRef.gallery
    .doc(artId)
    .get()
    .then((response) => {
      const data = response.data();
      if (data) {
        art = data;
      }
    })
    .catch((err) => (err = err));

  if (err) {
    return err;
  }
  return art;
}
