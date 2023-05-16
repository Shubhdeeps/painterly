export interface Notification {
  receiver: string;
  senderPhotoURL: string | null;
  senderName: string;
  id: string;
  content: string;
  created: number;
  status: "unseen" | "seen" | "archived";
  redirectLink: string;
  type: "LIKED" | "COMMENT" | "UNKNOWN";
  senderUid: string;
}

export interface ConnectionRequestModel {
  receiver: string;
  senderPhotoURL: string | null;
  senderName: string;
  id: string;
  content: string;
  created: number;
  status: "unseen" | "seen";
  redirectLink: string;
  senderUid: string;
  type: "FOLLOW" | "REQUEST" | "ACCEPT";
}
