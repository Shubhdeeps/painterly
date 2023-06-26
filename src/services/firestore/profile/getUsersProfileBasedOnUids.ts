import { Profile } from "@/models/Profile";
import { collectionRef } from "../collectionOperations";
import { auth } from "@/services/firebaseConfig";
import firebase from "firebase";
const localStorageKey = "painterly-users-profiles";

export async function getUsersProfileBasedOnUids(uids: string[]) {
  const uidAndProfileMap = new Map<string, Profile>();
  const profilesRef: Promise<firebase.firestore.DocumentSnapshot<Profile>>[] =
    [];
  for (const uid of uids) {
    // get profile from session storage
    const profileFromSessionStorages = sessionStorage.getItem(
      `${localStorageKey}_${uid}`
    );

    if (profileFromSessionStorages) {
      const profile = JSON.parse(profileFromSessionStorages) as Profile;
      uidAndProfileMap.set(uid, profile);
    } else {
      const profileRef = collectionRef.profile.doc(uid).get();
      profilesRef.push(profileRef);
    }
  }

  //fetch all pending profiles now
  const profiles = await Promise.all(profilesRef);
  for (const profileDoc of profiles) {
    const profile = profileDoc.data();
    if (profile) {
      // setting to map object
      uidAndProfileMap.set(profile.uid, profile);

      //also setting to sessionStorage
      sessionStorage.setItem(
        `${localStorageKey}_${profile.uid}`,
        JSON.stringify(profile)
      );
    }
  }
  const profilesToReturn = uidAndProfileMap.values();
  return Array.from(profilesToReturn);
}
