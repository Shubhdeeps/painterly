import { database } from "@/services/firebaseConfig";
import { getCurrUserProfile } from "../../firestore/profile";
import { Notification } from "@/models/Notification";

export async function markReadAll() {
  const currUser = await getCurrUserProfile();
  const getAllUnSeenNotifications = await database
    .ref("notifications/unseen/" + currUser.uid)
    .get();
  if (!getAllUnSeenNotifications.exists()) {
    return;
  }
  getAllUnSeenNotifications.forEach((oldNotification) => {
    const oldNotificationValue = oldNotification.val() as Notification;
    database
      .ref("notifications/seen/" + oldNotificationValue.receiver)
      .child(oldNotificationValue.id)
      .set(oldNotificationValue);
  });
  //remove all the unseen ones now
  database.ref("notifications/unseen/" + currUser.uid).remove();
}

export async function markReadBasedOnId(notificationId: string) {
  const currUser = await getCurrUserProfile();
  const getAllUnSeenNotifications = await database
    .ref("notifications/unseen/" + currUser.uid)
    .child(notificationId)
    .get();
  if (!getAllUnSeenNotifications.exists()) {
    return;
  }

  console.log();

  const oldNotificationValue = getAllUnSeenNotifications.val() as Notification;
  const id = oldNotificationValue.id;

  database
    .ref("notifications/seen/" + oldNotificationValue.receiver)
    .child(id)
    .set(oldNotificationValue);
  //remove the unseen one now

  database
    .ref("notifications/unseen/" + currUser.uid)
    .child(notificationId)
    .remove();
}
