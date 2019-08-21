import { HttpExceptionBase, IHttpExceptionOptions } from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class ForbiddenException extends HttpExceptionBase {
  public constructor (trace: IHttpExceptionOptions) {
    super(trace)
    this.code = HttpCodes.FORBIDDEN
    this.exceptionType = 'Forbidden Exception'
  }
}

export default ForbiddenException
