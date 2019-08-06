import App from './App'
import LogService from '../Services/LogService'

function run (): void {
  const port = process.env.PORT || 3333
  const appUrl = process.env.APP_URL || 'http://localhost'
  App.listen(port)

  LogService.clearLog('console')

  LogService.logIntoConsole(`Server started at ${appUrl}:${port}/`)
}

run()
