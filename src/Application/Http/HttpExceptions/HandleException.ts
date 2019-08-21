import InternalServerErrorException from './InternalServerErrorException'
import { HttpExceptionBase } from './HttpExceptionBase'

class HandleException {
  public handle (error) {
    if (error instanceof HttpExceptionBase) {
      return error
    }

    return new InternalServerErrorException({ message: `Internal Server Error -> ${String(error)}` })
  }
}

export default new HandleException()
