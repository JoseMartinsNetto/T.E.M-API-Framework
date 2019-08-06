import IUser from '../../../Domain/Interfaces/IUser'

export interface IAuthResponse {
    user: IUser
    token: string
}
