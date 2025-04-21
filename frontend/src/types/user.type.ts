export interface User {
  _id: string;
  username: string;
  email: string;
  // password: string;
  gender?: number;
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}
