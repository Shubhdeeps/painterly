import { Comment, CommentsProps } from "@/models/Comment";
import { firestore } from "@/services/firebaseConfig";
import { usersCached } from "@/services/caching/caching";
import { collectionRef } from "../../collectionOperations";

export const getCommentsOfCurrentPost = async (postId: string) => {
  try {
    const commentsDocs = await firestore
      .collection("gallery")
      .doc(postId)
      .collection("comments")
      .orderBy("created", "desc")
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
          uid: profile.uid,
          isMentor: profile.profileType === "Advisor",
        };
      }
    });

    const data: CommentsProps[] = comments.map((comment) => {
      return {
        author: {
          name: usersCached[comment.authorId].displayName,
          profileURL: usersCached[comment.authorId].profileURL,
          uid: comment.authorId,
          isMentor: usersCached[comment.authorId].isMentor,
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
