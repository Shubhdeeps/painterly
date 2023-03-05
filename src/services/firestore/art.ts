import { ArtRequests } from "@/models/Requests";
import { randomUUID } from "crypto";
import { firestore, timestamp } from "@/services/firebaseConfig";
import { collectionRef } from "./collectionOperations";

export const createNewArtRequest = async (
  artId: string,
  artURL: string,
  authorId: string,
  displayName: string
) => {
  const requestId = randomUUID();
  const newRequest: ArtRequests = {
    artId,
    artURL,
    authorId,
    assigneeId: "",
    created: timestamp,
    resolved: false,
    response: null,
    displayName,
    requestId,
  };
  await collectionRef.artRequests.doc(requestId).set(newRequest);
};

export const getRequestsOfCurrentUser = async (
  uid: string,
  setData: any,
  setError: any
) => {
  try {
    const allReqDocs: ArtRequests[] = [];
    const reqDocs = await collectionRef.artRequests
      .where("authorId", "==", uid)
      .get();
    reqDocs.docs.forEach((docs) => {
      const data = docs.data() as ArtRequests;
      if (data) allReqDocs.push(data);
    });
    setData(reqDocs);
  } catch (err: any) {
    setError(err);
  }
};
