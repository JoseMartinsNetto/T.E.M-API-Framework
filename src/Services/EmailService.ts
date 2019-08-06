import SendGrid from '@sendgrid/mail'
import IEmailRequest from './Resources/Interfaces/IEmailRequest'

class EmailService {
  public async sendMail (data: IEmailRequest): Promise<IEmailRequest> {
    return new Promise<IEmailRequest>(async (resolve, reject): Promise<void> => {
      try {
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY)

        if (!data.from) {
          data.from = process.env.DEFAULT_EMAIL_SENDER
        }

        await SendGrid.send(data)
        return resolve(data)
      } catch (error) {
        return reject(error)
      }
    })
  }
}

export default new EmailService()
