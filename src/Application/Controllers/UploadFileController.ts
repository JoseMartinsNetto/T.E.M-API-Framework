import { Response } from 'express'
import ICustomRequest from '../../Services/Resources/Interfaces/ICustomRequest'
import HttpCodes from '../../Services/Resources/Enums/HttpCodes'

import FileService from '../../Services/FileService'

class UploadFileController {
  public async upload (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const { originalname: name, size, filename: key } = req.file

      const fileRequest = { name, size, key, url: `${process.env.STORAGE_URL}/${key}` }

      const file = await FileService.saveFromUpload(fileRequest)
      return res.status(HttpCodes.CREATED).json(file)
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }

  public async index (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const files = await FileService.getAll()
      return res.status(HttpCodes.OK).json(files)
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }

  public async delete (req: ICustomRequest, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await FileService.delete(id)
      return res.status(HttpCodes.NO_CONTENT).send()
    } catch (error) {
      return res.status(error.code).json(error.stack)
    }
  }
}

export default new UploadFileController()
