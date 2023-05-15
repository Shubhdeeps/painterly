import { Post } from "@/models/Post";
import { auth, database } from "@/services/firebaseConfig";

export function updateCurrUserPoolOnNewPost(post: Post) {
  const postId = post.artId;
  const postCreateSeconds = `${post.created.seconds}`;
  const currUserId = auth.currentUser?.uid!;
  database.ref("pool/" + currUserId).update({
    [postCreateSeconds]: postId,
  });
}

export function updateUserPoolOnPostDelete(createdSeconds: number) {
  const currUserId = auth.currentUser?.uid!;
  database
    .ref("pool/" + currUserId)
    .child(`${createdSeconds}`)
    .remove();
}
