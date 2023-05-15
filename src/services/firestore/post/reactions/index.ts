import { FieldValue, auth, firestore } from "@/services/firebaseConfig";
import { sendNewNotification } from "../../../realtimeDB/notifications/sendNotification";

export async function updateReactionOnPost(
  postId: string,
  entity: "sad" | "smile" | "shocked" | "fire" | "heart",
  status: "LIKE" | "DISLIKE",
  artAuthorId: string
) {
  try {
    const uidOfLiker = auth.currentUser?.uid!;
    if (!uidOfLiker) {
      return;
    }
    if (status === "LIKE") {
      firestore
        .collection("gallery")
        .doc(postId)
        .update({
          [entity]: FieldValue.arrayUnion(uidOfLiker),
        });

      //don't send notification if its by curr user
      sendNewNotification(artAuthorId, `liked your art.`, `/art/${postId}`);
    } else {
      firestore
        .collection("gallery")
        .doc(postId)
        .update({
          [entity]: FieldValue.arrayRemove(uidOfLiker),
        });
    }
  } catch (err) {
    console.log(err);
  }
}
