import jwt from 'jsonwebtoken'
import HttpCodes from '../../Services/Resources/Enums/HttpCodes'
import { Response } from 'express'
import ICustomRequest from '../../Services/Resources/Interfaces/ICustomRequest'
import IDecodedJWT from '../../Services/Resources/Interfaces/IDecodedJWT';

const AuthMiddleware = (req: ICustomRequest, res: Response, next: any) : any => {
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

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded: IDecodedJWT): any => {
    if (err) {
      return res.status(HttpCodes.UNAUTHORIZED).json({ error: 'Invalid token' })
    }

    req.userId = decoded.id
    return next()
  })
}

export default AuthMiddleware
