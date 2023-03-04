import { usersCached } from "@/caching/caching";
import { firestore } from "@/services/firebaseConfig";
import { Comment, CommentsProps } from "@/types/Comment";
import { User } from "@/types/User";

const profileRef = firestore.collection("profiles")

export const getCommentsOfCurrentPost = async (postId:string) => {
    try{
        const commentsDocs = await firestore.collection("gallery").doc(postId).collection("comments").orderBy("created", "asc").get();
        const comments = commentsDocs.docs.map(comment => comment.data() as Comment); 
        const authorIds = comments.map((comment) => comment.authorId)
        const uidsToBeFetched: string[] = []
        for(const uid of authorIds){
            if(!usersCached[uid]){
                uidsToBeFetched.push(uid)
            }
        }
        const userProfileDocs = await Promise.all(uidsToBeFetched.map(uid => profileRef.doc(uid).get()))
        const profiles = userProfileDocs.map((doc) => doc.data() as User)
        profiles.map((profile) => {
            usersCached[profile.uid] = {
                displayName: profile.displayName,
                profileURL: profile.profileURL
            }
        })
        const data: CommentsProps[] = comments.map((comment) => {
            return {
                 author: {
                    name: usersCached[comment.authorId].displayName,
                    profileURL: usersCached[comment.authorId].profileURL,
                 },
                 commentText: comment.commentText,
                 date: comment.created,
                 isMentor: false,
                 commentId: comment.commentId
            }
        })
        return data
    }catch(err){
        console.log(err);
    }
}