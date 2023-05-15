import { UserPool } from "@/models/UserPool";
import { database } from "@/services/firebaseConfig";

export async function getUserPoolBasedOnUid(uid: string) {
  const userPool = await database.ref("pool" + uid).get();
  if (!userPool.exists()) {
    return {};
  }
  return userPool.val() as UserPool;
}
