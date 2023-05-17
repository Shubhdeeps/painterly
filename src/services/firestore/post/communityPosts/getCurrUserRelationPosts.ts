import { getPoolOfCurrUserRelations } from "@/services/realtimeDB/pool";
import { collectionRef } from "../../collectionOperations";
import { Post } from "@/models/Post";
import firebase from "firebase";
const AMOUNT_TO_FETCH = 10;
export async function getCurrUserRelationPosts(
  lastPostDate: number,
  filter: string | undefined
): Promise<Post[] | null | undefined> {
  const userRelationsSorted = await getPoolOfCurrUserRelations();
  console.log("Pools::", userRelationsSorted);

  // fetch art of 10 user sorted in desc order, starting from lastItemNumber
  const userRelationsOf10Users = userRelationsSorted.splice(
    lastPostDate,
    AMOUNT_TO_FETCH
  );

  const allPostsPromise: Promise<firebase.firestore.DocumentSnapshot<Post>>[] =
    [];
  for (const userRel of userRelationsOf10Users) {
    const artId = userRel.postId;
    const artDoc = collectionRef.gallery.doc(artId).get();
    allPostsPromise.push(artDoc);
  }

  const allPosts = await Promise.all(allPostsPromise);
  const allPostsData: Post[] = [];
  for (const post of allPosts) {
    const postData = post.data();
    if (postData) {
      allPostsData.push(postData);
    }
  }

  return allPostsData;
}
