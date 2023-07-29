import { auth } from "@/services/firebaseConfig";
import { collectionRef } from "../collectionOperations";

export async function getAllAvailableMentors() {
  const availableMentorProfilesQuery = await collectionRef.profile
    .where("profileType", "==", "Advisor")
    .where("isAvailable", "==", true)
    .get();

  return availableMentorProfilesQuery.docs.map((profileDoc) =>
    profileDoc.data()
  );
}

export async function switchAdvisorProfileAvailabilityStatus(status: boolean) {
  const currUserId = auth.currentUser?.uid;
  await collectionRef.profile.doc(currUserId).update({
    isAvailable: status,
  });
}
