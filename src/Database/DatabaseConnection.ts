import mongoose from 'mongoose'
import LogService from '../Services/LogService'

class DatabaseConnection {
  public async connect (): Promise<void> {
    try {
      await mongoose.connect(process.env.STRING_CONNECTION, {
        useNewUrlParser: true
      })
      LogService.logIntoConsole('Database connected!')
    } catch (error) {
      LogService.logIntoConsole(`Error while trying to connect a database -> ${error}`)
    }
  }
}

export default new DatabaseConnection()
