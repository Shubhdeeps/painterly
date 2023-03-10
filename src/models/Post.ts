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
  sadness: string[];
  heart: string[];
  bomb: string[];
  fire: string[];
  category: string[];
}
