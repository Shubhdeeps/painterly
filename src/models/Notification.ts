import { Timestamp, FieldValue } from "@/services/firebaseConfig";

export interface Notification {
  receiver: string;
  sender: string;
  id: string;
  content: string;
  created: number;
  status: "unseen" | "seen" | "archived";
  type: "new-comment" | "new-like" | "feedback-posted" | "following-you";
}

export interface FriendRequest {
  receiver: string;
  sender: string;
  senderPhotoURL: string;
  senderName: string;
  id: string;
  content: string;
  created: number;
  status: "unseen" | "seen";
  action: "accepted" | "rejected" | "pending";
}
