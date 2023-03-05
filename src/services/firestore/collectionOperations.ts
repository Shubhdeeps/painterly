import { firestore } from "../firebaseConfig";
import firebase from "firebase";
import { Profile } from "@/models/Profile";
import { Post } from "@/models/Post";
import { Comment } from "@/models/Comment";
import { ArtRequests } from "@/models/Requests";
import { UserCommunity } from "@/models/UserFollowers";

const collectionRefWithType = <Type>(collectionName: string) =>
  firestore.collection(
    collectionName
  ) as firebase.firestore.CollectionReference<Type>;

const subCollectionRefWithType = <T, P>(
  postId: string,
  subCollectionName: "comments" | "likes",
  parentCollectionName: string
) =>
  collectionRefWithType<P>(parentCollectionName)
    .doc(postId)
    .collection(subCollectionName) as firebase.firestore.CollectionReference<T>;

export const collectionRef = {
  profile: collectionRefWithType<Profile>("profiles"),
  gallery: collectionRefWithType<Post>("gallery"),
  comments: (postId: string) =>
    subCollectionRefWithType<Comment, Post>(postId, "comments", "gallery"),
  artRequests: collectionRefWithType<ArtRequests>("art_requests"),
  userCommunity: collectionRefWithType<UserCommunity>("art_requests"),
};
