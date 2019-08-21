import { HttpExceptionBase, IHttpExceptionOptions } from './HttpExceptionBase'
import HttpCodes from '../HttpCodes'

class NotFoundException extends HttpExceptionBase {
  public constructor (trace: IHttpExceptionOptions) {
    super(trace)
    this.code = HttpCodes.NOT_FOUND
    this.exceptionType = 'Not Found Exception'
  }
}

export default NotFoundException
