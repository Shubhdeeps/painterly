import { Timestamp } from "@/services/firebaseConfig";

export interface ArtRequests {
  authorId: string;
  artId: string;
  created: Timestamp;
  artURL: string;
  resolved: boolean; // is resolved
  assigneeId?: string;
  requestId: string;
}
