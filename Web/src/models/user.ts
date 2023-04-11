export interface User {
  username: string;
  displayName: string;
  token: string;
  image?: string;
  bio?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
  displayName: string;
  username: string;
}
