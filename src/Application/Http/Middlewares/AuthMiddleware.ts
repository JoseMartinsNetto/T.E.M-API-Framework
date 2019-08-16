import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import ICustomRequest from '../../Configs/Interfaces/ICustomRequest'
import IDecodedJWT from '../../../Services/Resources/Interfaces/IDecodedJWT'
import HttpCodes from '../HttpCodes'
import IMiddleware from '../../Configs/Interfaces/IMiddleware'

class AuthMiddleware implements IMiddleware {
  public intercepter (req: ICustomRequest, res: Response, next: NextFunction): NextFunction | Response | void{
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

export default new AuthMiddleware().intercepter
