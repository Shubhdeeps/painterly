import { Profile } from "@/models/Profile";
import { auth, provider } from "../firebaseConfig";
import { collectionRef } from "../firestore/collectionOperations";
import { usernames } from "@/assets/userNames/usernames";

export function signOut() {
  auth.signOut();
}

function generateUsername() {
  const totalUserName = usernames.length;
  const random = Math.round(Math.random() * 10000);
  const randomUserNumber = Math.floor(Math.random() * totalUserName);
  return `${usernames[randomUserNumber]}${random}`;
}

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then(async (result) => {
      const user = result.user;
      const username = generateUsername();
      if (user) {
        const doesUserExist = await collectionRef.profile.doc(user.uid).get();

        if (!doesUserExist.exists) {
          //create anon user, if it does not exist
          const newUser: Profile = {
            description: "",
            displayName: username,
            followersCount: 0,
            profileType: "Trainee",
            profileURL: null,
            uid: user.uid,
            searchName: username.toLowerCase(),
          };
          collectionRef.profile.doc(user.uid).set(newUser);
        }
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

export const signInAnonymously = () => {
  auth
    .signInAnonymously()
    .then(async (result) => {
      const user = result.user;
      const username = generateUsername();
      if (user) {
        const doesUserExist = await collectionRef.profile.doc(user.uid).get();

        if (!doesUserExist.exists) {
          //create anon user, if it does not exist
          const newUser: Profile = {
            description: "",
            displayName: username,
            followersCount: 0,
            profileType: "Trainee",
            profileURL: null,
            uid: user.uid,
            searchName: username.toLowerCase(),
          };
          collectionRef.profile.doc(user.uid).set(newUser);
        }
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
