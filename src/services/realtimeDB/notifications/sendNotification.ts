import { Notification } from "@/models/Notification";
import { v4 as uuidv4 } from "uuid";
import { database, serverTimestamp } from "../../firebaseConfig";
import { getCurrUserProfile } from "../../firestore/profile";

export async function sendNewNotification(
  receiver: string,
  content: string,
  redirectLink: string
) {
  const currUserProfile = await getCurrUserProfile();
  const isCurrUserIsReceiver = receiver === currUserProfile.uid;

  if (isCurrUserIsReceiver) {
    return;
  }
  const id = uuidv4();
  const notification: Notification = {
    content,
    receiver,
    created: serverTimestamp.now().seconds,
    id,
    senderName: currUserProfile.displayName,
    senderPhotoURL: currUserProfile.profileURL,
    status: "unseen",
    type: "UNKNOWN",
    redirectLink,
    senderUid: currUserProfile.uid,
  };
  try {
    database
      .ref("notifications/unseen/" + receiver)
      .child(id)
      .set(notification);
  } catch (e) {
    console.log(e);
  }
}
