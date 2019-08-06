class CustomException {
    public code: number
    public message: string
    public stack: {code: number, message: string}

    public constructor (code: number, message: string) {
      this.code = code
      this.message = message
      this.stack = { code: this.code, message: this.message }
    }
}

export default CustomException
