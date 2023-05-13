import { FieldValue, auth, firestore } from "@/services/firebaseConfig";

export function updateReactionOnPost(
  postId: string,
  entity: "sad" | "smile" | "shocked" | "fire" | "heart",
  status: "LIKE" | "DISLIKE"
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
