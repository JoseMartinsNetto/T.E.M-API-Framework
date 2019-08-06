import fs from 'fs'
import HandleException from './Resources/Exceptions/HandleException'
import LogService from './LogService'

class FileService {
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
