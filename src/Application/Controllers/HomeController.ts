import { Request, Response } from 'express'
import path from 'path'
import HttpCodes from '../../Services/Resources/Enums/HttpCodes'

class HomeController {
  public async index (req: Request, res: Response): Promise<void | Response> {
    try {
      const USE_CLIENT_MODE = process.env.USE_CLIENT_MODE
      const useClientMode = USE_CLIENT_MODE === 'true'

      if (useClientMode) {
        return res.sendFile(path.join(__dirname, '../', '../', '../', 'public/index.html'))
      }

      return res.status(HttpCodes.OK).json({ message: 'Hello from Api Boilerplate', see: 'https://github.com/jmsantosnetto/typescript-api-boilerplate' })
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }
}

export default new HomeController()
