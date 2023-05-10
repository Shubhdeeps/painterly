import {
  Timestamp,
  firestore,
  timestamp,
  auth,
  storage,
  FieldValue,
} from "@/services/firebaseConfig";
import firebase from "firebase";
import { Post } from "@/models/Post";
import { collectionRef } from "./collectionOperations";
import { v4 as uuidv4 } from "uuid";

const AMOUNT_TO_BE_FETCHED = 10;
// let firstLoad = true;
export const getAllPosts = async (
  lastPostDate: Timestamp | undefined,
  filter: string
) => {
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

import { usersCached } from "@/services/caching/caching";
import { Comment, CommentsProps } from "@/models/Comment";

export const getCommentsOfCurrentPost = async (postId: string) => {
  try {
    const commentsDocs = await firestore
      .collection("gallery")
      .doc(postId)
      .collection("comments")
      .orderBy("created", "asc")
      .get();
    const comments = commentsDocs.docs.map(
      (comment) => comment.data() as Comment
    );
    const authorIds = comments.map((comment) => comment.authorId);
    const uidsToBeFetched: string[] = [];

    for (const uid of authorIds) {
      if (!usersCached[uid]) {
        uidsToBeFetched.push(uid);
      }
    }

    const userProfileDocs = await Promise.all(
      uidsToBeFetched.map((uid) => collectionRef.profile.doc(uid).get())
    );
    const profiles = userProfileDocs.map((doc) => doc.data());

    //caching fetched profiles
    profiles.forEach((profile) => {
      if (profile) {
        usersCached[profile.uid] = {
          displayName: profile.displayName,
          profileURL: profile.profileURL,
        };
      }
    });

    const data: CommentsProps[] = comments.map((comment) => {
      return {
        author: {
          name: usersCached[comment.authorId].displayName,
          profileURL: usersCached[comment.authorId].profileURL,
          uid: comment.authorId,
        },
        commentText: comment.commentText,
        date: comment.created,
        isMentor: false,
        commentId: comment.commentId,
      };
    });
    return data;
  } catch (err) {
    console.log(err);
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
      created: timestamp,
      description,
      bomb: [],
      fire: [],
      heart: [],
      sadness: [],
      smile: [],
      title,
    };
    const res = await collectionRef.gallery.doc(newId).set(NewPost);
    return res;
  } catch (e: any) {
    return e.message;
  }
};

export const createComment = async (
  postId: string,
  commentText: string,
  isMentor: boolean
) => {
  const author = auth.currentUser!;
  const commentId = uuidv4();
  const created = firebase.firestore.Timestamp.now();
  const newComment: Comment = {
    authorId: author?.uid!,
    commentId,
    commentText,
    created,
    parentId: postId,
    isMentor,
  };
  await collectionRef.gallery
    .doc(postId)
    .collection("comments")
    .doc(commentId)
    .set(newComment);
  const commentsProps: CommentsProps = {
    author: {
      name: author?.displayName!,
      profileURL: author?.photoURL,
      uid: author?.uid,
    },
    commentId,
    commentText,
    date: created,
    isMentor: false,
  };
  return commentsProps;
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
