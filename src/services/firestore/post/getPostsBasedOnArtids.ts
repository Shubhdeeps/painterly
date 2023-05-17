import { Post } from "@/models/Post";
import { collectionRef } from "../collectionOperations";
import firebase from "firebase";
export async function getPostsBasedOnArtIds(artIds: string[]) {
  const artPostsArray: Promise<firebase.firestore.DocumentSnapshot<Post>>[] =
    [];
  for (const artId of artIds) {
    const art = collectionRef.gallery.doc(artId).get();
    artPostsArray.push(art);
  }
  const artData = await Promise.all(artPostsArray);
  const posts: Post[] = [];
  for (const artDoc of artData) {
    const art = artDoc.data();
    if (art) {
      posts.push(art);
    }
  }
  return posts;
}
