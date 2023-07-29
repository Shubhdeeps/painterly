type user = {
  displayName: string;
  profileURL: string | null;
  uid: string;
  isMentor: boolean;
};
export const usersCached: { [uid: string]: user } = {};
