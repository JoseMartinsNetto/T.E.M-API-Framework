import ISignupRequest from './Resources/Interfaces/Request/ISignupRequest'
import IAuthRequest from './Resources/Interfaces/Request/IAuthRequest'
import IAuthResponse from './Resources/Interfaces/Response/IAuthResponse';
import IGenerateTokenParams from './Resources/Interfaces/IGenerateTokenParams'
import IEmailRequest from './Resources/Interfaces/IEmailRequest'
import IResetPasswordRequest from './Resources/Interfaces/Request/IResetPasswordRequest'
import IUser from '../Domain/Interfaces/IUser'

import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import EmailService from './EmailService'
import CustomException from './Resources/Exceptions/CustomException'
import HttpCodes from './Resources/Enums/HttpCodes'
import HandleException from './Resources/Exceptions/HandleException'
import User from '../Domain/Models/User'

class UserService {
  private generateToken (params: IGenerateTokenParams): string {
    return jwt.sign(params, process.env.AUTH_SECRET)
  }

  private userExists (userData: ISignupRequest): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject): Promise<void> => {
      try {
        const { username, email } = userData

        let user = await User.findOne({ email })

        if (!user) {
          user = await User.findOne({ username })

          if (!user) {
            return resolve(false)
          }

          return resolve(true)
        }

        return resolve(true)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public signup (userData: ISignupRequest): Promise<IAuthResponse> {
    return new Promise<IAuthResponse>(async (resolve, reject): Promise<void> => {
      try {
        const { password } = userData
        const userExists = await this.userExists(userData)

        if (userExists) {
          throw new CustomException(HttpCodes.BAD_REQUEST, 'User already exists')
        }

        if (!userData.userType) {
          userData.userType = 'staff'
        }

        const hash = await bcryptjs.hash(password, 10)
        userData.password = hash

        const user = await User.create(userData)
        const token = this.generateToken({ id: user._id })

        user.password = undefined

        return resolve({ user, token })
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public createUser (userData: ISignupRequest): Promise<IUser[]> {
    return new Promise<IUser[]>(async (resolve, reject): Promise<void> => {
      try {
        const { password } = userData
        const userExists = await this.userExists(userData)

        if (userExists) {
          throw new CustomException(HttpCodes.BAD_REQUEST, 'User already exists')
        }

        const hash = await bcryptjs.hash(password, 10)
        userData.password = hash

        const user = await User.create(userData)

        user.password = undefined

        const users = await this.getUsers()

        return resolve(users)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public editUser (userId: string, userData: ISignupRequest): Promise<IUser[]> {
    return new Promise<IUser[]>(async (resolve, reject): Promise<void> => {
      try {
        const user = await User.findById(userId)

        user.categories = []

        await user.save()

        await User.findOneAndUpdate({ _id: userId }, userData)

        const users = await this.getUsers()

        return resolve(users)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public async authenticate (loginData: IAuthRequest): Promise<IAuthResponse> {
    return new Promise<IAuthResponse>(async (resolve, reject): Promise<void> => {
      try {
        const { username, password } = loginData

        let user = await User.findOne({ username }).select('+password')

        if (!user) {
          user = await User.findOne({ email: username }).select('+password')
          if (!user) {
            throw new CustomException(HttpCodes.NOT_FOUND, 'User not found')
          }
        }

        const isValid = await bcryptjs.compare(password, user.password)

        if (!isValid) {
          throw new CustomException(HttpCodes.UNAUTHORIZED, 'Invalid password')
        }

        const token = this.generateToken({ id: user._id })

        user.password = undefined

        return resolve({ user, token })
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public forgotPassword (email: string): Promise<IEmailRequest> {
    return new Promise<IEmailRequest>(async (resolve, reject): Promise<void> => {
      try {
        const user = await User.findOne({ email })

        if (!user) {
          throw new CustomException(HttpCodes.NOT_FOUND, 'User not found')
        }

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        user.passwordResetToken = token
        user.passwordResetExpires = now

        await user.save()

        const msgUrl = `${process.env.FRONT_URL}/reset-password/token/${encodeURIComponent(token)}/email/${encodeURIComponent(user.email)}`

        const msg = await EmailService.sendMail({
          to: user.email,
          from: '',
          subject: 'Esqueceu Sua Senha?',
          html: `<p>Email de Recuperação de senha, clique no link abaixo para recuperar sua senha:</p>
          <p><a href="${msgUrl}">${msgUrl}</a></p>`
        })
        return resolve(msg)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public resetPassword (data: IResetPasswordRequest): Promise<void> {
    return new Promise<void>(async (resolve, reject): Promise<void> => {
      try {
        const { email, password, token } = data
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires email')

        if (!user) {
          throw new CustomException(HttpCodes.NOT_FOUND, 'User not found')
        }

        if (token !== user.passwordResetToken) {
          throw new CustomException(HttpCodes.BAD_REQUEST, 'Invalid Token')
        }

        const now = new Date()

        if (now > user.passwordResetExpires) {
          throw new CustomException(HttpCodes.BAD_REQUEST, 'Token expired, please generate a new one')
        }

        const newPassword = await bcryptjs.hash(password, 10)

        user.password = newPassword
        await user.save()
        return resolve()
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public getUsers (): Promise<IUser[]> {
    return new Promise<IUser[]>(async (resolve, reject) : Promise<void> => {
      try {
        const users = await User.find()
        return resolve(users)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public getUser (userId: string): Promise<IUser> {
    return new Promise<IUser>(async (resolve, reject) : Promise<void> => {
      try {
        const user = await User.findById(userId)
        return resolve(user)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }
}

export default new UserService()
