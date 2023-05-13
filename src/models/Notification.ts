export interface Notification {
  receiver: string;
  senderPhotoURL: string | null;
  senderName: string;
  id: string;
  content: string;
  created: number;
  status: "unseen" | "seen" | "archived";
  type: "new-comment" | "new-like" | "feedback-posted" | "following-you";
  redirectLink: string;
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
  redirectLink: string;
}
