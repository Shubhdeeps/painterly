import { database } from "@/services/firebaseConfig";
import { getCurrUserProfile } from "@/services/firestore/profile";

export async function doesCurrArtFavoriteByCurrUser(artId: string) {
  const currUser = await getCurrUserProfile();
  const dbRef = database.ref("favorites/" + currUser.uid);
  const getArtStatus = await dbRef.child(artId).get();

  if (getArtStatus.exists()) {
    return true;
  }
  return false;
}
