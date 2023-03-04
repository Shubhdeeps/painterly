import { auth, firestore, provider } from "../firebaseConfig";


// For current user only!
// export const validateUser = async (uid: string, displayName: string | null) => {
//     const user = await firestore.collection("profiles").doc(uid).get();
//     if(user.exists){
//         currentUser.value = user.data() as User;
//     } else {
//         const newUser: User = {
//             displayName: displayName !== null ? displayName : "New User",
//             profileURL: null,
//             description:  null,
//             followersCount: 0,
//             profileType: "Trainee",
//             uid: uid,
//         }
//         await firestore.collection("profiles").doc(uid).set(newUser)
//         currentUser.value = newUser
//     }
    
// }

export function signOut(){
    auth.signOut()
}
export const signInWithGoogle = () => {
    auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      console.log(credential);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = credential.accessToken;
      // // The signed-in user info.
      const user = result.user;
      console.log(user?.email);
      
      // ...
    }).catch((error) => {
      // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...

      console.log(email, credential);
      
    });
}