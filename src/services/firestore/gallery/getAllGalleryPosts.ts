import { Timestamp, firestore, timestamp } from "@/services/firebaseConfig";
import { Post } from "@/types/Post";

const AMOUNT_TO_BE_FETCHED = 10;
export const getAllPosts = async (lastPostDate: Timestamp | undefined, filter: string) => {
  try{
      console.log(filter)
      let firstPostTime = timestamp;
      if(lastPostDate){
          firstPostTime = lastPostDate
        }
        const docs: Post[] = []; 
      await firestore
        .collection("gallery")
        .orderBy("created", "desc")
        .startAfter(firstPostTime)
        .limit(AMOUNT_TO_BE_FETCHED)
        .get()
        .then((response) => {
            response.docs.forEach(doc => {
                const data = doc.data() as Post;
                docs.push(data);
            })
    }).catch((err) => console.log(err))
    return docs
} catch (e) {
    console.log(e)
}
}