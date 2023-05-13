import { Profile } from "@/models/Profile";
import { collectionRef } from "../collectionOperations";
import { auth } from "@/services/firebaseConfig";

const localStorageKey = "painterly-user-profile";

export async function getCurrUserProfile() {
  const userProfileFromStorage = localStorage.getItem(localStorageKey);
  if (!userProfileFromStorage) {
    return await updateUserProfileToLocalStorage();
  }
  return JSON.parse(userProfileFromStorage) as Profile;
}

async function updateUserProfileToLocalStorage() {
  const currUserId = auth.currentUser?.uid!;
  const user = (await collectionRef.profile.doc(currUserId).get()).data();
  if (!user) {
    throw "ERROR, USER NOT FOUND!";
  }
  localStorage.setItem(localStorageKey, JSON.stringify(user));
  return user;
}
