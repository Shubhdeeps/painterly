import { auth, firestore, storage } from "@/services/firebaseConfig";
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

const updateProfilePic = async (image: File) => {
  let imageURL = "";
  const displayName = auth.currentUser?.displayName?.split(" ")[0];
  const extension = image.name.split(".").pop();

  await storage
    .ref()
    .child(`profiles/${displayName}.${extension}`)
    .put(image)
    .then(async (res) => {
      imageURL = await res.ref.getDownloadURL();
    });
  auth.currentUser?.updateProfile({
    photoURL: imageURL,
  });
};
// read about namedQuery
