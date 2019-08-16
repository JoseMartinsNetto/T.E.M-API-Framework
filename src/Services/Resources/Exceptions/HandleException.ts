/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomException from './CustomException'
import HttpCodes from '../../../Application/Http/HttpCodes'

class HandleException {
  public handle (error: any): CustomException {
    if (!error.code) {
      return new CustomException(HttpCodes.SERVER_ERROR, `Internal Server Error -> ${String(error)}`)
    }

    return error
  }
}

export default new HandleException()
