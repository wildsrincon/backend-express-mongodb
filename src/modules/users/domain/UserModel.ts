import { Schema, Types, model } from 'mongoose'
import { User, Role } from "./User";

const UserSchema = new Schema<User>({
  _id: Types.ObjectId,
  username: {type: String, required: true, unique: true, minlength: 3},
  password: {type: String, required: true, minlength: 8},
  email: {type: String, required: true, trim: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  active: {type: Boolean, default: false},
  roles: Types.Array<Role>
})

const UsersModel = model<User>('User', UserSchema)

export default UsersModel


