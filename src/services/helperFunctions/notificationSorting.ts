import { Notification, ConnectionRequestModel } from "@/models/Notification";

//created desc order
export function notificationSorting(
  a: Notification | ConnectionRequestModel,
  b: Notification | ConnectionRequestModel
) {
  if (a.created < b.created) {
    return 1;
  }
  if (a.created > b.created) {
    return -1;
  }
  return 0;
}
