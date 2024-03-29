import { Timestamp } from "@/services/firebaseConfig";

function secondsToString(seconds: number) {
  if (seconds < 60) {
    return `< 1 minute ago`;
  }
  if (seconds < 3600) {
    return `${Math.round(seconds / 60)} minutes ago`;
  }
  if (seconds < 24 * 3600) {
    return `${Math.round(seconds / 3600)} hours ago`;
  }
  if (seconds < 30 * 24 * 3600) {
    return `${Math.round(seconds / (24 * 3600))} days ago`;
  }
  return `${Math.round(seconds / (24 * 3600 * 30))} months ago`;
}

export function timestampSecondsToString(timestampSeconds: number) {
  const currentTime = Math.floor(Date.now() / 1000);
  const seconds = currentTime - timestampSeconds;

  return secondsToString(seconds);
}

export const firebaseTimestampToString = (time: Timestamp) => {
  const timestampSeconds = time.seconds;
  const currentTime = Math.floor(Date.now() / 1000);
  const seconds = currentTime - timestampSeconds;

  return secondsToString(seconds);
};

export const firebaseTimestampToTime = (firebaseDate: Timestamp) => {
  const hrs = firebaseDate.toDate().getHours().toString().padStart(2, "0");
  const mins = firebaseDate.toDate().getMinutes().toString().padStart(2, "0");
  const time = `${hrs}:${mins}`;
  return time;
};

export const firebaseTimestampToDateString = (firebaseDate: Timestamp) => {
  const month = (firebaseDate.toDate().getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const dayOfTheMonth = firebaseDate
    .toDate()
    .getUTCDate()
    .toString()
    .padStart(2, "0");
  const year = firebaseDate.toDate().getUTCFullYear();
  return `${dayOfTheMonth}/${month}/${year}`;
};

export const firebaseTimestampToDayNumber = (firebaseDate: Timestamp) => {
  const dayOfTheMonth = firebaseDate.toDate().getUTCDate();
  return dayOfTheMonth;
};
