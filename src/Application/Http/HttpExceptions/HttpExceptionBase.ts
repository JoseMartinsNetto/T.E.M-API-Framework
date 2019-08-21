export interface IHttpExceptionOptions {
    code?: number
    message: string
}

export class HttpExceptionBase {
    public code: number
    public message: string
    public exceptionType: string

    public constructor (trace: IHttpExceptionOptions) {
      this.message = trace.message
    }
}
