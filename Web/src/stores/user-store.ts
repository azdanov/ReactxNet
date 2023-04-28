import { makeAutoObservable, reaction, runInAction } from "mobx";

import client from "../api/client";
import { User, UserLogin, UserRegister } from "../models/user";

class UserStore {
  user?: User = JSON.parse(localStorage.getItem("user") || "null") as User;
  refreshTokenTimeout: number | undefined;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.user,
      (user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
        }
      }
    );
  }

  get token() {
    return this.user?.token;
  }

  get isLoggedIn() {
    return !!this.user;
  }

  async login({ email, password }: UserLogin) {
    const user: User = await client
      .post({ email, password }, "/api/accounts/login")
      .json();
    if (user) {
      this.setUser(user);
      this.startRefreshTokenTimer(user);
    }
  }

  async register({ email, password, username, displayName }: UserRegister) {
    const user: User = await client
      .post(
        {
          email,
          password,
          username,
          displayName,
        },
        "/api/accounts/register"
      )
      .json();
    if (user) {
      this.setUser(user);
      this.startRefreshTokenTimer(user);
    }
  }

  async getUser(controller: AbortController) {
    const user: User = await client
      .signal(controller)
      .get("/api/accounts")
      .json();
    if (user) {
      this.setUser(user);
      this.startRefreshTokenTimer(user);
    }
  }

  async logout() {
    this.user = undefined;
  }

  setImage(url: string) {
    if (this.user) {
      this.user.image = url;
    }
  }

  private setUser(user: User) {
    this.user = user;
  }

  async refreshToken() {
    this.stopRefreshTokenTimer();
    try {
      const user: User = await client
        .url("/api/accounts/refresh-token")
        .post()
        .json();
      runInAction(() => (this.user = user));
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  }

  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1])) as {
      exp: number;
    };
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

export default UserStore;
