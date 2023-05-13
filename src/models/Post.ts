import { Timestamp } from "@/services/firebaseConfig";

export interface Post {
  authorId: string;
  created: Timestamp;
  artId: string;
  artURL: string;
  title: string;
  description: string;
  commentsCount: number;
  smile: string[];
  sad: string[];
  heart: string[];
  shocked: string[];
  fire: string[];
  category: string[];
}
