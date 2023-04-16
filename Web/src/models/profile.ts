import { Photo } from "./photo";

export interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  image?: string;
  photos: Photo[];
}
