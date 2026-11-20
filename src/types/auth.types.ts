export interface LoginCredentials {
  identifier: string; // Accepts either email address or mobile number
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}