import { Post } from "@/models/Post";
import { ArtRequests } from "@/models/Requests";
import { serverTimestamp } from "@/services/firebaseConfig";
import { getCurrUserProfile } from "../../profile";
import { v4 } from "uuid";
import { collectionRef } from "../../collectionOperations";

export async function createNewRequestPost(post: Post) {
  const requestId = v4();

  const currUser = await getCurrUserProfile();
  const requestPost: ArtRequests = {
    artId: post.artId,
    artURL: post.artURL,
    assigneeId: "",
    authorId: post.authorId,
    created: serverTimestamp.now(),
    displayName: currUser.displayName,
    requestId,
    resolved: false,
    response: null,
  };

  collectionRef.artRequests.doc(requestId).set(requestPost);
}
