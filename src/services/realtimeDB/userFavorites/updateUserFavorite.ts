import { auth, database } from "@/services/firebaseConfig";
import { getCurrUserProfile } from "@/services/firestore/profile";

export async function updateUserFavorite(
  action: "ADD" | "REMOVE",
  artId: string
) {
  const currUserId = await getCurrUserProfile();
  const dbRef = database.ref("favorites/" + currUserId.uid);
  if (action === "ADD") {
    dbRef.update({ [artId]: true });
  } else {
    dbRef.child(artId).remove();
  }
}
