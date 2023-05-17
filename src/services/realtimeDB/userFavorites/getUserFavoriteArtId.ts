import { database } from "@/services/firebaseConfig";

export async function getUserFavoriteArtIdsBasedOnUid(uid: string) {
  const dbRef = database.ref("favorites/" + uid);
  const userFavsDoc = await dbRef.get();
  if (!userFavsDoc.exists()) {
    return [];
  }
  const userFavs = userFavsDoc.val() as { [artId: string]: boolean };
  return Object.keys(userFavs);
}
