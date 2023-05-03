import type { Types } from "mongoose"
export type Role = 'admin' | 'user'


export interface User {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  active: boolean;
  roles: Array<Role>
}
