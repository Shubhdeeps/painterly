type user = {
  displayName: string;
  profileURL: string | null;
};
export const usersCached: { [uid: string]: user } = {};
