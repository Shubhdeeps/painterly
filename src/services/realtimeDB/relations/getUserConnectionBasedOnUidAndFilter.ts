import { UserRelations } from "@/models/userRelations";
import { database } from "@/services/firebaseConfig";
import { Effect } from "./Relations.model";

export async function getUserConnectionUidsBasedOnUidAndFilter(
  uid: string,
  filter: Effect
) {
  const userRelations = await database.ref("relations/" + uid).get();
  const dummyRelations: UserRelations = {
    connections: [],
    otherUserRequests: [],
    requestedToConnect: [],
    userFollowers: [],
    userFollowings: [],
  };
  if (!userRelations.exists) {
    return dummyRelations[filter];
  }
  const relations: UserRelations = {
    ...dummyRelations,
    ...(userRelations.val() as UserRelations),
  };
  return relations[filter];
}
