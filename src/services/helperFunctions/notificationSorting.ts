import { Notification } from "@/models/Notification";

export function notificationSorting(a: Notification, b: Notification) {
  if (a.created < b.created) {
    return 1;
  }
  if (a.created > b.created) {
    return -1;
  }
  return 0;
}
