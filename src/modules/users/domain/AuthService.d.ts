import { Role } from "./User";

export interface AuthService {
  generateJwt: (userId: string, roles: Role[]) => string;
  verifyJwt: (token: string) => Payload;
  encryptPassword: (password: string) => Promise<string>;
  comparePassword: (password: string, receivedPassword: string) => Promise<boolean>;
}
