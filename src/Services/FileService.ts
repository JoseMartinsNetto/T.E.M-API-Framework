import fs from 'fs'
import HandleException from './Resources/Exceptions/HandleException'
import LogService from './LogService'
import IFile from '../Domain/Interfaces/IFile';
import File from '../Domain/Models/File';
import IFileRequest from './Resources/Interfaces/Request/IFileRequest';

class FileService {
  public saveFromUpload(fileRequest: IFileRequest): Promise<IFile> {
    return new Promise<IFile> (async (resolve, reject): Promise<void> => {
      try {
        const file = await File.create(fileRequest)
        return resolve(file)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public getAll(): Promise<IFile[]> {
    return new Promise<IFile[]>(async (resolve, reject): Promise<void> => {
      try {
        const files = await File.find()
        return resolve(files)
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }

  public delete(fileId: string): Promise<void> {
    return new Promise<void> (async (resolve, reject): Promise<void> => {
      try {
        const file = await File.findById(fileId)

        await file.remove()
        
        return resolve()
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }
  
  
  public saveStringIntoFile (path: string, content: string): Promise<void> {
    return new Promise((resolve, reject): void => {
      try {
        fs.writeFile(path, content, function (err): void {
          if (err) return reject(err)

          LogService.logIntoConsole(`THE FILE ${path} WAS SAVED!`)

          return resolve()
        })
      } catch (error) {
        return reject(HandleException.handle(error))
      }
    })
  }
}

export default new FileService()
