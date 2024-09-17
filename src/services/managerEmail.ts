import nodemailer from "nodemailer";
import { ISendEmail } from "../interfaces";

export class ManagerEmail {
  async sendEmail({ subject, userEmail, validateCode }: ISendEmail) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.SERVICE_EMAIL, // Ex: 'gmail'
        auth: {
          user: process.env.DEV_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const emailOptions = {
        from: process.env.DEV_EMAIL,
        to: userEmail,
        subject: subject,
        text: `Seu código de verificação é: ${validateCode}`,
      };

      // Envia o email
      await transporter.sendMail(emailOptions);
      console.log("Email enviado com sucesso");
    } catch (error) {
      console.log("Erro ao enviar o email", error);
      throw new Error("Erro ao enviar o email");
    }
  }
}
