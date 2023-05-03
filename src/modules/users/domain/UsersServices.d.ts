import type { User } from './User';

export interface UserService {
  /** This method returns a single document according to the search parameters
   * @param search -> Uniques user keys like _id, username, email or telf */
  getOneUser: (search: SearchOneUserParams) => Promise<User | null>;
  /** This method returns a array documents according to the search parameters
   * @param search -> users keys like name, active, rol */
  getAllUsers: (search: SearchAllUsersParams) => Promise<User[]>;
  register: (user: User) => Promise<User>;
  checkUserAndPassword: (username: string, password: string) => Promise<User | null>;
  createUser: (user: User) => Promise<User>;
  updateUserById: (_id: string, user: User) => Promise<User | null>;
  deleteUserById: (_id: string) => Promise<User | null>;
}
