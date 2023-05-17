import { UserPool } from "../../../models/UserPool";
import { getCurrUserRelation } from "@/services/realtimeDB/relations";
import { getUserPoolBasedOnUid } from "@/services/realtimeDB/userPostsPool";

export type ArrayOfUserRelationPool = { created: number; postId: string };
export async function getPoolOfCurrUserRelations() {
  const currUserRelations = await getCurrUserRelation();

  const currUserRelationUids = [
    ...currUserRelations.connections,
    ...currUserRelations.userFollowings,
  ];

  //eliminate duplicates
  const currUserRelationUidsUnique = Array.from(new Set(currUserRelationUids));

  //get user pool promise in array
  const userRelationPoolPromise: Promise<UserPool>[] = [];
  for (const uid of currUserRelationUidsUnique) {
    const userPool = getUserPoolBasedOnUid(uid);
    userRelationPoolPromise.push(userPool);
  }

  const allUserPool = await Promise.all(userRelationPoolPromise);

  const arrayOfUserRelationPool: ArrayOfUserRelationPool[] = [];
  for (const userPool of allUserPool) {
    for (const currUserEnteries of Object.keys(userPool)) {
      const userRelnPool: ArrayOfUserRelationPool = {
        created: +currUserEnteries,
        postId: userPool[currUserEnteries],
      };
      arrayOfUserRelationPool.push(userRelnPool);
    }
  }

  return arrayOfUserRelationPool.sort(sortUserReln);
}

function sortUserReln(a: ArrayOfUserRelationPool, b: ArrayOfUserRelationPool) {
  if (a.created < b.created) {
    return 1;
  }
  if (a.created > b.created) {
    return -1;
  }
  return 0;
}
