
export interface AuthUser {
    username: string;
    role: string;
    permissions?:string[]
    password?: string; 
}
export interface LoginResponse {
    success: boolean;
    message: string;
  }
