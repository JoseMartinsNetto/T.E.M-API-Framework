import jwt from 'jsonwebtoken'
import HttpCodes from '../../Services/Resources/Enums/HttpCodes'
import { Response, RequestHandler, NextFunction } from 'express'
import ICustomRequest from '../../Services/Resources/Interfaces/ICustomRequest'
import IDecodedJWT from '../../Services/Resources/Interfaces/IDecodedJWT';

class AuthMiddleware {
  public intercepter: RequestHandler

  constructor () {
    this.intercepter = (req: ICustomRequest,  res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        return res.status(HttpCodes.UNAUTHORIZED).json({ error: 'No Bearer token provided' })
      }

      const parts = authHeader.split(' ')
      const isValid = parts.length === 2

      if (!isValid) {
        return res.status(HttpCodes.UNAUTHORIZED).json({ error: 'Invalid token authorization' })
      }

      const [scheme, token] = parts
      const pattern = /Bearer/i
      const test = pattern.test(scheme)

      if (!test) {
        return res.status(HttpCodes.UNAUTHORIZED).json({ error: 'Invalid Bearer token format' })
      }

      jwt.verify(token, process.env.AUTH_SECRET, (err, decoded: IDecodedJWT): void => {
        if (err) {
          res.status(HttpCodes.UNAUTHORIZED).json({ error: 'Invalid token' })
          return
        }

        req.userId = decoded.id
        next()
      })
    } 
  }
}

export default new AuthMiddleware().intercepter
