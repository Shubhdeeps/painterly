import { collectionRef } from "../collectionOperations";

export async function updateSadness() {
  console.log("updating");

  const gallery = await collectionRef.gallery.get();
  const galleryIds = gallery.docs.map((va) => va.id);

  for (const item of galleryIds) {
    collectionRef.gallery.doc(item).update({
      sad: [],
      shocked: [],
    });
  }
  console.log("updated!!");
}
