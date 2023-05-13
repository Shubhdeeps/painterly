import { FriendRequest } from "@/models/Notification";
import { v4 as uuidv4 } from "uuid";
import { auth, database, serverTimestamp } from "../firebaseConfig";

export function sendFriendRequest(receiver: string, redirectLink: string) {
  const senderName = auth.currentUser?.displayName!;
  const content = `${senderName} sends you friend request.`;
  const id = uuidv4();
  const request: FriendRequest = {
    action: "pending",
    content,
    created: serverTimestamp.now().seconds,
    id,
    receiver,
    sender: auth.currentUser?.uid!,
    senderName,
    senderPhotoURL: auth.currentUser?.photoURL!,
    status: "unseen",
    redirectLink,
  };
  try {
    database
      .ref("requests/" + receiver)
      .child(id)
      .set(request);
  } catch (e) {
    console.log(e);
  }
}
