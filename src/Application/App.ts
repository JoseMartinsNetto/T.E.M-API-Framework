import express from 'express'
import cors from 'cors'
import routes from './Routes'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'

import DatabaseConnection from '../Database/DatabaseConnection'
import LogService from '../Services/LogService';

class App {
    public express: express.Application
    private useStaticFiles: boolean

    public constructor () {
      dotenv.config()
      const USE_STATIC_FILES = process.env.USE_STATIC_FILES

      this.useStaticFiles = USE_STATIC_FILES === "true"
      this.express = express()

      this.middlewares()
      this.routes()
      DatabaseConnection.connect()
        .then((response) => LogService.logIntoConsole(response))
    }

    private middlewares (): void {
      this.express.use(express.json())
      this.express.use(express.urlencoded())
      this.express.use(cors())
      this.express.use(morgan('dev'))

      if(this.useStaticFiles){
        this.express.use(express.static(path.join(__dirname, '../', '../', 'public')))
      }
    }

    private routes (): void {
      this.express.use(routes)
    }
}

export default new App().express