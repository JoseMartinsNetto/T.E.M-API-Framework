/* eslint-disable @typescript-eslint/no-explicit-any */
class LogService {
  public logIntoConsole (content: any, obj?: any): void{
    if (obj) {
      console.log(content, obj)
      console.log()
      return
    }
    console.log(content)
    console.log()
  }

  public clearLog (where: string): void{
    if (where === 'console') {
      console.clear()
    }
  }
}

export default new LogService()
