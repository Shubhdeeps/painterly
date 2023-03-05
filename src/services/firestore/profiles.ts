import { firestore } from "@/services/firebaseConfig";

export const profileRef = firestore.collection("profiles");
export const getProfileByUID = async (uid: string) => {
  try {
    const doc = await profileRef.doc(uid).get();
    const data = doc.data();
    return data;
  } catch (e) {
    console.log(e);
  }
};
