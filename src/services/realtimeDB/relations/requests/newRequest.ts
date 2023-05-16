import { database, serverTimestamp } from "@/services/firebaseConfig";
import { Actions } from "../Relations.model";
import { ConnectionRequestModel } from "@/models/Notification";
import { v4 as uuidv4 } from "uuid";
import { getCurrUserProfile } from "@/services/firestore/profile";

export async function newRequestNotification(
  otherUserId: string,
  action: Actions
) {
  const dbRef = database.ref("requests/" + otherUserId);
  const currUser = await getCurrUserProfile();
  const currUserDbRef = database.ref("requests/" + currUser.uid);
  // dont send notifications in these sceneries, and delete realtime db entries
  if (
    action === "DISCONNECT" ||
    action === "REJECT" ||
    action === "UN-FOLLOW" ||
    action === "CANCEL-REQUEST"
  ) {
    switch (action) {
      case "CANCEL-REQUEST":
        dbRef.child(`REQUEST_${currUser.uid}`).remove();
        break;
      case "REJECT":
        currUserDbRef.child(`REQUEST_${otherUserId}`).remove();
        break;
    }
    return;
  }
  const id = uuidv4();
  let content = "";
  const created = serverTimestamp.now().seconds;
  switch (action) {
    case "ACCEPT":
      content = "accepted your connection request.";
      currUserDbRef.child(`REQUEST_${otherUserId}`).remove();
      break;
    case "FOLLOW":
      content = "starting following you.";
      break;
    case "REQUEST":
      content = "requested to connect with you.";
      break;
  }
  const request: ConnectionRequestModel = {
    content,
    created,
    id,
    receiver: otherUserId,
    redirectLink: `/profile/${currUser.uid}`,
    senderName: currUser.displayName,
    senderPhotoURL: currUser.profileURL,
    status: "unseen",
    senderUid: currUser.uid,
    type: action,
  };

  dbRef.child(`${action}_${currUser.uid}`).set(request);
}
