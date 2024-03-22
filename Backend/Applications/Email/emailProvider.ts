import { Resend } from "resend";

class emailProvider {
  private emailSender: string;
  private resend: Resend;

  constructor(emailSender: string, api_key: string) {
    this.emailSender = emailSender;
    this.resend = new Resend(api_key);
  }

  async sendEmail({ to, subject, htmlContent }: { to: string[]; subject: string; htmlContent: string }) {
    const { data, error } = await this.resend.emails.send({
      from: this.emailSender,
      to,
      subject,
      html: htmlContent,
    });

    if (error) {
      return { error };
    }

    return { data };
  }
}

export default emailProvider;
