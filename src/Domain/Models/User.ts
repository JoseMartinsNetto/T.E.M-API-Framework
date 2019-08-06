import { Schema, model } from 'mongoose'
import IUser from '../Interfaces/IUser'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cellPhone: {
    type: String
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  userType: {
    type: String,
    required: true
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  }
},
{
  timestamps: true
})

export default model<IUser>('User', UserSchema)
