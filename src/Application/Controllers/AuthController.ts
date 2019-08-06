import { Request, Response } from 'express'
import UserService from '../../Services/UserService'
import HttpCodes from '../../Services/Resources/Enums/HttpCodes'

class AuthController {
  public async signup (req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.signup(req.body)
      return res.status(HttpCodes.CREATED).json(user)
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }

  public async authenticate (req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.authenticate(req.body)
      return res.status(HttpCodes.OK).json(user)
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }

  public async forgotPassword (req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body

      await UserService.forgotPassword(email)

      return res.status(HttpCodes.NO_CONTENT).send()
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }

  public async resetPassword (req: Request, res: Response): Promise<Response> {
    try {
      await UserService.resetPassword(req.body)

      return res.status(HttpCodes.OK).json({ message: 'Password resetd successful' })
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }
}
export default new AuthController()
