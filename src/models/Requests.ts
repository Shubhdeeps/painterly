import { Timestamp } from "@/services/firebaseConfig";

export interface ArtRequests {
  authorId: string;
  artId: string;
  created: Timestamp;
  artURL: string;
  resolved: boolean;
  response: string | null;
  assigneeId: string;
  displayName: string;
  requestId: string;
}
