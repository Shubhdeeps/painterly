import { Profile } from "@/models/Profile";
import { auth, provider } from "../firebaseConfig";
import { collectionRef } from "../firestore/collectionOperations";

export function signOut() {
  auth.signOut();
}
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      //   /** @type {firebase.auth.OAuthCredential} */
      //   // const credential = result.credential;
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   // const token = credential.accessToken;
      //   // // The signed-in user info.
      const user = result.user;
      if (user) {
        const displayName = user.displayName
          ? user.displayName
          : user.email!.split("@")[0];
        const newUser: Profile = {
          description: "",
          displayName,
          followersCount: 0,
          profileType: "Trainee",
          profileURL: user.photoURL,
          uid: user.uid,
          searchName: displayName.toLowerCase(),
        };
        collectionRef.profile.doc(user.uid).set(newUser);
      }
      //   // console.log(user?.email);

      //   // ...
    })
    .catch((error) => {
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
};
