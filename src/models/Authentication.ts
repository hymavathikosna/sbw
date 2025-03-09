export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginOTPRequest {
  phone: string;
}
export interface JwtResponse {
  message: string;
  token: string;
  createAt: string;
}
