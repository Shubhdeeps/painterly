import { database } from "@/services/firebaseConfig";
import { collectionRef } from "../collectionOperations";

export async function updateUserPool() {
  const gallery = await collectionRef.gallery.get();
  const galleryDocs = gallery.docs.map((x) => x.data());
  const usersAndPostsPool: {
    [authorId: string]: {
      [createdSeconds: number]: string;
    };
  } = {};
  for (const post of galleryDocs) {
    const userPosts = usersAndPostsPool[post.authorId];
    if (!userPosts) {
      usersAndPostsPool[post.authorId] = {
        [post.created.seconds]: post.artId,
      };
    } else {
      usersAndPostsPool[post.authorId] = {
        ...userPosts,
        [post.created.seconds]: post.artId,
      };
    }
  }

  for (const authorId of Object.keys(usersAndPostsPool)) {
    database.ref("pool/" + authorId).set(usersAndPostsPool[authorId]);
  }
  console.log("success!!");
}
