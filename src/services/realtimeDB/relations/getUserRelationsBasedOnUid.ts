import { UserRelations } from "@/models/userRelations";
import { database } from "@/services/firebaseConfig";
import { getCurrUserProfile } from "@/services/firestore/profile";

export async function getCurrUserRelation() {
  const user = await getCurrUserProfile();
  const userRelations = await database.ref("relations/" + user.uid).get();
  const dummyRelations: UserRelations = {
    connections: [],
    otherUserRequests: [],
    requestedToConnect: [],
    userFollowers: [],
    userFollowings: [],
  };
  if (!userRelations.exists) {
    return dummyRelations;
  }
  const relations: UserRelations = {
    ...dummyRelations,
    ...(userRelations.val() as UserRelations),
  };
  return relations;
}
