import {
  Timestamp,
  timestamp,
  auth,
  storage,
  serverTimestamp,
} from "@/services/firebaseConfig";
import { Post } from "@/models/Post";
import { collectionRef } from "./collectionOperations";
import { v4 as uuidv4 } from "uuid";
import { updateCurrUserPoolOnNewPost } from "../realtimeDB/userPostsPool/createUserPool";

const AMOUNT_TO_BE_FETCHED = 10;
// let firstLoad = true;
export const getAllPosts = async (
  lastPostDate: Timestamp | undefined,
  filter: string | undefined
) => {
  if (!filter) {
    return [];
  }
  try {
    let lastPost = timestamp;

    if (lastPostDate) {
      lastPost = lastPostDate;
    }
    console.log("fetching from....", lastPost.seconds);
    const posts = await collectionRef.gallery
      .where("category", "array-contains", filter)
      .orderBy("created", "desc")
      .startAfter(lastPost)
      .limit(AMOUNT_TO_BE_FETCHED)
      .get();
    // .get({
    //   source: "cache",
    // });
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

export async function getGalleryPostBasedOnArtId(
  artId: string
): Promise<Post | ""> {
  let err;
  let art: Post | "" = "";
  await collectionRef.gallery
    .doc(artId)
    .get()
    .then((response) => {
      const data = response.data();
      if (data) {
        art = data;
      }
    })
    .catch((err) => (err = err));

  if (err) {
    return err;
  }
  return art;
}

export const postNewArt = async (
  title: string,
  image: File,
  description: string,
  categories: string[]
) => {
  try {
    const category = ["all", ...categories];
    const currentUser = auth.currentUser?.uid;
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

    const NewPost: Post = {
      artId: newId,
      artURL: imageURL,
      authorId: currentUser!,
      category,
      commentsCount: 0,
      created: serverTimestamp.now(),
      description,
      shocked: [],
      fire: [],
      heart: [],
      sad: [],
      smile: [],
      title,
    };
    const res = await collectionRef.gallery.doc(newId).set(NewPost);
    updateCurrUserPoolOnNewPost(NewPost);
    return res;
  } catch (e: any) {
    return e.message;
  }
};

export const getPostsBasedOnUid = async (
  lastPostDate: Timestamp | undefined,
  uid: string
) => {
  try {
    let lastPost = timestamp;

    if (lastPostDate) {
      lastPost = lastPostDate;
    }
    const posts = await collectionRef.gallery
      .where("authorId", "==", uid)
      .orderBy("created", "desc")
      .startAfter(lastPost)
      .limit(AMOUNT_TO_BE_FETCHED)
      .get();
    // .get({
    //   source: "cache",
    // });
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
