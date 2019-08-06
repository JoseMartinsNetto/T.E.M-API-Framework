import { Document } from 'mongoose'
import ICategory from './ICategory'

export default interface IUser extends Document{
    name: string;
    username: string;
    email: string;
    phone: string;
    userType: string;
    cellPhone?: string;
    expensionLine?: number;
    password: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    categories: []
}
