﻿import { makeAutoObservable, reaction } from "mobx";

import client from "../api/client";
import { User, UserLogin, UserRegister } from "../models/user";

class UserStore {
  user?: User = JSON.parse(localStorage.getItem("user") || "null") as User;

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
      .post({ email, password }, "/api/account/login")
      .json();

    if (user) {
      this.setUser(user);
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
        "/api/account/register"
      )
      .json();

    if (user) {
      this.setUser(user);
    }
  }

  async getUser(controller: AbortController) {
    const user: User = await client
      .signal(controller)
      .get("/api/account")
      .json();

    if (user) {
      this.setUser(user);
    }
  }

  async logout() {
    this.user = undefined;
  }

  private setUser(user: User) {
    this.user = user;
  }
}

export default UserStore;