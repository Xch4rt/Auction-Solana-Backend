import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';


@Injectable()
export class EmailService {
  private mailgun = new Mailgun(FormData);
  private mg = this.mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: 'https://api.mailgun.net/'
  });


  async sendMailTo(receiver: string, verificationCode: string) {
    try {
      const message = await this.mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: 'Xch4rt <pab203.guti@gmail.com>',
        to: receiver,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`
      });
      return message;
    } catch (error) {
      console.log("Error al enviar el correo: ", error)
    }

  }
}
