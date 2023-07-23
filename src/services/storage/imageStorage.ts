import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebaseConfig";

export async function uploadImagesAndGetURL(image: File) {
  const newId = uuidv4();
  const extension = image.name.split(".").pop();

  let imageURL = "";
  await storage
    .ref()
    .child(`drawings/${newId}.${extension}`)
    .put(image)
    .then(async (res) => {
      imageURL = await res.ref.getDownloadURL();
    });
  return imageURL;
}
