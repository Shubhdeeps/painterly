// Model for requests

import { Timestamp } from "@/services/firebaseConfig";
import { CommentsProps } from "./Comment";

export type Timeline = {
  requestId: string;
  description: string;
  requestAuthor: string;
  created: Timestamp;
  artId: string;
  assigneeId?: string;
  resolved: boolean;
  timeline: {
    [key: number]: {
      type: "image" | "comment";
      authorUid: string;
      created: Timestamp;
      contentId: string; // image url or comment id
      isMentor: boolean;
      itemNumber: number;
    };
  };
};

export type RequestedArt = {
  imageURL: string;
  type: "image";
  artId: string;
  isMentor: boolean;
  itemNumber: number;
  created: Timestamp;
};

export type TimelineComment = CommentsProps & {
  type: "comment";
  itemNumber: number;
};
