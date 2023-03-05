import { Timestamp } from "@/services/firebaseConfig";

export interface Comment {
    parentId: string;
    commentId: string;
    commentText: string;
    authorId: string;
    created: Timestamp;
}

export type CommentsProps = {
      author: {
        name: string;
        profileURL: string | null;
      };
      date: Timestamp;
      commentText: string;
      isMentor: boolean;
      commentId: string;
  };