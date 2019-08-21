
import { HttpExceptionBase, IHttpExceptionOptions } from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class InternalServerErrorException extends HttpExceptionBase {
  public constructor (trace: IHttpExceptionOptions) {
    super(trace)
    this.code = HttpCodes.SERVER_ERROR
    this.exceptionType = 'Internal ServerError Exception'
  }
}

export default InternalServerErrorException
