export interface User {
  _id?: string;
  id?: string;
  username: string;
  email?: string;
  password?: string;
  is_admin?: boolean;
}

export interface UserState {
  username: string;
  is_admin?: boolean;
  email?: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface initState {
  user?: UserState | null;
  isLoading: boolean;
}

export interface EmailPassword {
  username: string;
  password: string;
  referral?: string;
  email?: string;
  code?: string;
}

export interface AuthResponse extends Tokens {
  user?: User;
}
