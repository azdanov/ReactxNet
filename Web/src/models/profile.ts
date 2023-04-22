import { Photo } from "./photo";

export interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  following: boolean;
  followersCount: number;
  followingCount: number;
  photos: Photo[];
}

export type ProfileUpdateFormValues = Pick<Profile, "displayName" | "bio">;

export enum FollowersPredicate {
  Followers = "followers",
  Following = "following",
}
