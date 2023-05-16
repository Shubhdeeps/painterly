import { database } from "@/services/firebaseConfig";
import { getCurrUserProfile } from "@/services/firestore/profile";

// request notifications can be FOLLOW< ACCEPT< REQUEST
// Remove ACCEPT AND FOLLOW
export async function seenCurrUserRequestNotification(otherUserUids: string[]) {
  const currUser = await getCurrUserProfile();
  const dbRef = database.ref("requests/" + currUser.uid);
  for (const uid of otherUserUids) {
    dbRef.child(`FOLLOW_${uid}`).remove();
    dbRef.child(`ACCEPT_${uid}`).remove();
  }
}
