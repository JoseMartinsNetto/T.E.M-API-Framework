import { HttpExceptionBase, IHttpExceptionOptions } from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class UnauthorizedException extends HttpExceptionBase {
  public constructor (trace: IHttpExceptionOptions) {
    super(trace)
    this.code = HttpCodes.UNAUTHORIZED
    this.exceptionType = 'Unauthorized Exception'
  }
}

export default UnauthorizedException
