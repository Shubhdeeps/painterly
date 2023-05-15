import { auth, database } from "@/services/firebaseConfig";
import { UserRelations } from "@/models/userRelations";
import { Actions, Effect } from "./Relations.model";
import { newRequestNotification } from "./requests";

const arrayUnion = "arrayUnion";
const arrayRemove = "arrayRemove";

type Respond = {
  [key in Actions]: {
    type: Effect;
    action: typeof arrayUnion | typeof arrayRemove;
  }[];
};
// const currUserActionToOtherUserCollectionMap = new Map<Actions, >();
const currUserActionToOtherUserCollection: Respond = {
  ACCEPT: [
    { type: "requestedToConnect", action: arrayRemove },
    { type: "connections", action: arrayUnion },
  ],
  REJECT: [{ type: "requestedToConnect", action: arrayRemove }],
  REQUEST: [{ type: "otherUserRequests", action: arrayUnion }],
  "CANCEL-REQUEST": [{ type: "otherUserRequests", action: arrayRemove }],
  //   BLOCK: [],
  FOLLOW: [{ type: "userFollowers", action: arrayUnion }],
  DISCONNECT: [{ type: "connections", action: arrayRemove }],
  "UN-FOLLOW": [{ type: "userFollowers", action: arrayRemove }],
};
const currUserActionToCurrUserCollection: Respond = {
  ACCEPT: [
    { type: "otherUserRequests", action: arrayRemove },
    { type: "connections", action: arrayUnion },
  ],
  REJECT: [{ type: "otherUserRequests", action: arrayRemove }],
  REQUEST: [{ type: "requestedToConnect", action: arrayUnion }],
  "CANCEL-REQUEST": [{ type: "requestedToConnect", action: arrayRemove }],
  //   BLOCK: [],
  FOLLOW: [{ type: "userFollowings", action: arrayUnion }],
  DISCONNECT: [{ type: "connections", action: arrayRemove }],
  "UN-FOLLOW": [{ type: "userFollowings", action: arrayRemove }],
};

/**
 *
 * @param otherUserId
 * @param action
 */
export async function connectWithNewUser(otherUserId: string, action: Actions) {
  const currUserId = auth.currentUser?.uid!;

  //update relations for curr user
  await updateRelations(
    currUserId,
    otherUserId,
    currUserActionToCurrUserCollection,
    action
  );

  //update relations for other user
  await updateRelations(
    otherUserId,
    currUserId,
    currUserActionToOtherUserCollection,
    action
  );

  // Send Notifications
  await newRequestNotification(otherUserId, action);
}

const updateRelations = async (
  currUserId: string,
  otherUserId: string,
  currUserOrOtherUserDBAction: Respond,
  action: Actions
) => {
  // ACTION ON CURR USER DB
  const actionOnCurrUsersDB = currUserOrOtherUserDBAction[action];

  // get previous value for currUser
  let currUserRelations: UserRelations = {
    connections: [],
    otherUserRequests: [],
    requestedToConnect: [],
    userFollowers: [],
    userFollowings: [],
  };
  const dbValueOfCurrUser = await database.ref("relations/" + currUserId).get();
  if (dbValueOfCurrUser.exists()) {
    const data = dbValueOfCurrUser.val() as UserRelations;
    currUserRelations = { ...currUserRelations, ...data };
  }
  for (const action of actionOnCurrUsersDB) {
    let list = currUserRelations[action.type];
    if (action.action === "arrayUnion") {
      list.push(otherUserId);
    } else {
      const newList = list.filter((value) => value !== otherUserId);
      list = newList;
    }
    currUserRelations[action.type] = list;
  }
  database.ref("relations/" + currUserId).update(currUserRelations);
};
