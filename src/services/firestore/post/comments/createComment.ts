import { v4 as uuidv4 } from "uuid";
import { Comment, CommentsProps } from "@/models/Comment";
import firebase from "firebase";
import { collectionRef } from "../../collectionOperations";
import { sendNewNotification } from "../../../realtimeDB/notifications/sendNotification";
import { getCurrUserProfile } from "../../profile";

export const createComment = async (
  postId: string,
  commentText: string,
  notificationRecieverUid: string,
  commentLocation: "post" | "art-request" = "post"
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

    let content = "commented on your art.";
    let redirectLink = `/art/${postId}`;

    if (commentLocation === "art-request") {
      content = "posted comment on the timeline.";
      redirectLink = `/requested/${postId}`;
    }
    sendNewNotification(notificationRecieverUid, content, redirectLink);
    const commentsProps: CommentsProps = {
      author: {
        name: author?.displayName!,
        profileURL: author?.profileURL,
        uid: author?.uid,
        isMentor: author.profileType === "Advisor",
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
