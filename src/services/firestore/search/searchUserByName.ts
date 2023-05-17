import { collectionRef } from "../collectionOperations";

export async function searchUserByName(name: string) {
  const data = await collectionRef.profile
    .orderBy("searchName")
    .startAt(name.toLowerCase())
    .endAt(name.toLowerCase() + "\uf8ff")
    .get();
  const result = data.docs.map((user) => user.data());
  return result;
}
