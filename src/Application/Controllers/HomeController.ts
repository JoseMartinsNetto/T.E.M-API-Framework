import { Request, Response } from 'express'
import path from 'path'
import HttpCodes from '../../Services/Resources/Enums/HttpCodes'

class HomeController {
  public async index (req: Request, res: Response): Promise<any> {
    try {
      const USE_STATIC_FILES = process.env.USE_STATIC_FILES
      const useStaticFiles = USE_STATIC_FILES === "true"
      
      if(useStaticFiles){
        return res.sendFile(path.join(__dirname, '../', '../', '../', 'public/index.html'))
      }

      return res.status(HttpCodes.OK).json({message: 'Hello from Api Boilerplate', see: 'https://github.com/jmsantosnetto/typescript-api-boilerplate'})
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }
}

export default new HomeController()
