export interface Notification {
  receiver: string;
  senderPhotoURL: string | null;
  senderName: string;
  id: string;
  content: string;
  created: number;
  status: "unseen" | "seen" | "archived";
  redirectLink: string;
}

export interface ConnectionRequest {
  receiver: string;
  senderPhotoURL: string | null;
  senderName: string;
  id: string;
  content: string;
  created: number;
  status: "seen" | "unseen";
  redirectLink: string;
}
