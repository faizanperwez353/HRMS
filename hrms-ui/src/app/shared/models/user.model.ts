export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token?: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}
