import { Notification } from "@/models/Notification";
import { v4 as uuidv4 } from "uuid";
import { auth, database, serverTimestamp } from "../firebaseConfig";

export function sendNewNotification(
  receiver: string,
  content: string,
  type: "new-comment" | "new-like" | "feedback-posted"
) {
  const id = uuidv4();
  const notification: Notification = {
    content,
    receiver,
    created: serverTimestamp.now().seconds,
    id,
    sender: auth.currentUser?.uid!,
    status: "unseen",
    type,
  };
  console.log(notification);
  try {
    database
      .ref("notifications/" + receiver)
      .child(id)
      .set(notification);
  } catch (e) {
    console.log(e);
  }
}
