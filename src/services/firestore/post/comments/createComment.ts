import { v4 as uuidv4 } from "uuid";
import { Comment, CommentsProps } from "@/models/Comment";
import firebase from "firebase";
import { auth } from "@/services/firebaseConfig";
import { collectionRef } from "../../collectionOperations";
import { sendNewNotification } from "../../notifications/sendNotification";
import { getCurrUserProfile } from "../../profile";

export const createComment = async (
  postId: string,
  commentText: string,
  postAuthor: string
) => {
  try {
    const author = await getCurrUserProfile();
    const commentId = uuidv4();
    const created = firebase.firestore.Timestamp.now();
    const newComment: Comment = {
      authorId: author?.uid!,
      commentId,
      commentText,
      created,
      parentId: postId,
      isMentor: author.profileType === "Advisor",
    };
    await collectionRef.gallery
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .set(newComment);

    sendNewNotification(
      postAuthor,
      "commented on your art.",
      "new-comment",
      `/art/${postId}`
    );
    const commentsProps: CommentsProps = {
      author: {
        name: author?.displayName!,
        profileURL: author?.profileURL,
        uid: author?.uid,
      },
      commentId,
      commentText,
      date: created,
      isMentor: false,
    };
    return commentsProps;
  } catch (e) {
    console.log(e);
    throw "Something went wrong!";
  }
};
