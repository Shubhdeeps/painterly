import { firestore } from "@/services/firebaseConfig"
import { Post } from "@/types/Post"



export async function getGalleryPostBasedOnArtId(artId: string): Promise<Post | "">{    
        let err;
        let art: Post | "" = "";
        await firestore
        .collection("gallery")
        .doc(artId)
        .get()
        .then((response) => {
            art = response.data() as Post
            // art = data
        }).catch((err) => err = err)

        if(err){
            return err
        }
        console.log(art);
        
        return art;
}