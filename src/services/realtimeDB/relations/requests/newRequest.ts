import { database, serverTimestamp } from "@/services/firebaseConfig";
import { Actions } from "../Relations.model";
import { Notification } from "@/models/Notification";
import { v4 as uuidv4 } from "uuid";
import { getCurrUserProfile } from "@/services/firestore/profile";

export async function newRequestNotification(
  otherUserId: string,
  action: Actions
) {
  // dont send notifications in these sceneries
  if (
    action === "DISCONNECT" ||
    action === "REJECT" ||
    action === "UN-FOLLOW" ||
    action === "CANCEL-REQUEST"
  ) {
    return;
  }
  const dbRef = database.ref("requests/" + otherUserId);
  const currUser = await getCurrUserProfile();
  const id = uuidv4();
  let content = "";
  const created = serverTimestamp.now().seconds;
  switch (action) {
    case "ACCEPT":
      content = "accepted your connection request.";
      break;
    case "FOLLOW":
      content = "starting following you.";
    case "REQUEST":
      content = "requested to connect with you.";
  }
  const request: Notification = {
    content,
    created,
    id,
    receiver: otherUserId,
    redirectLink: `/profile/${currUser.uid}`,
    senderName: currUser.displayName,
    senderPhotoURL: currUser.profileURL,
    status: "unseen",
  };

  dbRef.child(id).set(request);
}
