import { Request, Response } from 'express'
import UserService from '../../../Services/UserService'
import HttpCodes from '../HttpCodes'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getUsers()
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.createUser(req.body)
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }

  public async edit (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const users = await UserService.editUser(id, req.body)
      return res.status(HttpCodes.OK).json(users)
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }
}

export default new UserController()
