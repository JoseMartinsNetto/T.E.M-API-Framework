
import { HttpExceptionBase, IHttpExceptionOptions } from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class BadRequestException extends HttpExceptionBase {
  public constructor (trace: IHttpExceptionOptions) {
    super(trace)
    this.code = HttpCodes.BAD_REQUEST
    this.exceptionType = 'Bad Request Exception'
  }
}

export default BadRequestException
