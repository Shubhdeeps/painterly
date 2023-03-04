import { ArtRequests } from "@/types/Requests";
import { randomUUID } from "crypto";
import { firestore, timestamp } from "@/services/firebaseConfig";
export const createNewArtRequest = async(artId: string, artURL: string, authorId: string, displayName: string) => {
    const requestId = randomUUID()
    const newRequest: ArtRequests ={
        artId,
        artURL,
        authorId,
        assigneeId: "",
        created: timestamp,
        resolved: false,
        response: null,
        displayName,
        requestId
    }
    await firestore.collection("art_requests").doc(requestId).set(newRequest);
}