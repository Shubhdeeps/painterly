import { Timestamp, timestamp } from "@/services/firebaseConfig";
import { collectionRef } from "../../collectionOperations";

const AMOUNT_TO_BE_FETCHED = 10;

export const getRequestedPosts = async (
  lastPostDate: Timestamp | undefined,
  uid: string
) => {
  try {
    let lastPost = timestamp;

    if (lastPostDate) {
      lastPost = lastPostDate;
    }
    const posts = await collectionRef.artRequests
      .where("authorId", "==", uid)
      .orderBy("created", "desc")
      .startAfter(lastPost)
      .limit(AMOUNT_TO_BE_FETCHED)
      .get();

    if (posts.docs[posts.docs.length - 1].data().created === lastPostDate) {
      return null;
    }
    return posts.docs.map((post) => {
      const source = post.metadata.fromCache;
      console.log("source: ", source);
      return post.data();
    });
  } catch (e) {
    console.log(e);
  }
};
