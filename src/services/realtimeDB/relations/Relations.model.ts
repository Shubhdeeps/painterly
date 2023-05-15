export type Actions =
  | "ACCEPT"
  | "REJECT"
  | "REQUEST"
  | "FOLLOW"
  | "DISCONNECT"
  | "CANCEL-REQUEST"
  | "UN-FOLLOW";

export type Effect =
  | "otherUserRequests"
  | "requestedToConnect"
  | "connections"
  | "userFollowings"
  | "userFollowers";
