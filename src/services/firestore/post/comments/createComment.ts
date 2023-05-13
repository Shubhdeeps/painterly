import { v4 as uuidv4 } from "uuid";
import { Comment, CommentsProps } from "@/models/Comment";
import firebase from "firebase";
import { auth } from "@/services/firebaseConfig";
import { collectionRef } from "../../collectionOperations";

export const createComment = async (
  postId: string,
  commentText: string,
  isMentor: boolean
) => {
  const author = auth.currentUser!;
  const commentId = uuidv4();
  const created = firebase.firestore.Timestamp.now();
  const newComment: Comment = {
    authorId: author?.uid!,
    commentId,
    commentText,
    created,
    parentId: postId,
    isMentor,
  };
  await collectionRef.gallery
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .set(newComment);
  const commentsProps: CommentsProps = {
    author: {
      name: author?.displayName!,
      profileURL: author?.photoURL,
      uid: author?.uid,
    },
    commentId,
    commentText,
    date: created,
    isMentor: false,
  };
  return commentsProps;
};
