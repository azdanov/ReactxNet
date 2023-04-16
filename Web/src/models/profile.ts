import { Photo } from "./photo";

export interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  photos: Photo[];
}

export type ProfileUpdateFormValues = Pick<Profile, "displayName" | "bio">;
