export interface Profile {
  uid: string;
  displayName: string;
  description: string | null;
  profileURL: string | null;
  followersCount: number;
  profileType: "Advisor" | "Trainee" | "Admin";
  searchName: string;
  isAvailable?: boolean;
}
