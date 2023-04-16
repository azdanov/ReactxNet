import { makeAutoObservable, runInAction } from "mobx";

import client from "../api/client";
import { Photo } from "../models/photo";
import { Profile, ProfileUpdateFormValues } from "../models/profile";
import { store } from "./store";

class ProfileStore {
  profile: Profile | undefined;
  loadingProfile = false;
  uploading = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isCurrentUser() {
    return this.profile?.username === store.userStore.user?.username;
  }

  async loadProfile(username: string) {
    this.loadingProfile = true;
    try {
      const profile: Profile = await client
        .get(`/api/profiles/${username}`)
        .json();
      this.setProfile(profile);
    } finally {
      this.setLoadingProfile(false);
    }
  }

  setProfile(profile?: Profile) {
    this.profile = profile;
  }

  setLoadingProfile(loading: boolean) {
    this.loadingProfile = loading;
  }

  async uploadPhoto(file: Blob) {
    this.uploading = true;
    try {
      const photo = await client
        .url("/api/photos")
        .formData({ file })
        .post()
        .json<Photo>();
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }
      });
    } finally {
      this.uploading = false;
    }
  }

  async setMainPhoto(photo: Photo) {
    this.loading = true;

    try {
      await client.url(`/api/photos/${photo.id}/set-main`).post().res();
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.find((a) => a.isMain)!.isMain = false;
          this.profile.photos.find((a) => a.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
        }
      });
    } finally {
      this.loading = false;
    }
  }

  async deletePhoto(photo: Photo) {
    this.loading = true;

    try {
      await client.delete(`/api/photos/${photo.id}`).res();
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos.filter(
            (a) => a.id !== photo.id
          );
        }
      });
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(values: ProfileUpdateFormValues) {
    this.loading = true;

    try {
      await client.put(values, "/api/profiles").res();
      runInAction(() => {
        if (this.profile) {
          this.profile.displayName = values.displayName;
          this.profile.bio = values.bio;
        }
      });
    } finally {
      this.loading = false;
    }
  }
}

export default ProfileStore;
