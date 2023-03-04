import { firestore } from "@/services/firebaseConfig";
import { ArtRequests } from "@/types/Requests";


export const getRequestsOfCurrentUser = async (uid: string, setData: any, setError: any) => {

    try{
        const allReqDocs:ArtRequests[] = []
        const reqDocs = await firestore.collection("art_requests").where("authorId", "==", uid).get();
        reqDocs.docs.forEach((docs) => { 
            const data = docs.data() as ArtRequests
            if(data) allReqDocs.push(data);
        })
        setData(reqDocs)
    } catch( err : any){
        setError(err)
    }
}