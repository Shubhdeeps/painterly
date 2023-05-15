export interface UserRelations {
  userFollowers: string[];
  userFollowings: string[];
  connections: string[];
  requestedToConnect: string[]; // requested other user
  otherUserRequests: string[]; // requests i recieve
}
