import nodemailer from "nodemailer";

class emailProvider {
  private emailSender: string;
  private nodemailer: nodemailer;

  constructor(username: string, password: string) {
    this.emailSender = username;
    this.nodemailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: username,
        pass: password,
        //Paste your generated 16-digit password here as your password
        //To generate the password make sure to follow these steps,
        //Turn on 2-Step Verification in your Gmail
        //Go to your Google Account.
        //Select Security.
        //Under "Signing in to Google," select 2-Step Verification.
        //At the bottom of the page, select App passwords.
        //Enter a name that helps you remember where you’ll use the app password.
        //Select Generate.
        //To enter the app password, follow the instructions on your screen. The app password is the 16-character code that generates on your device.
        //Select Done.
      },
    });
  }

  async sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    const mailOptions = {
      from: this.emailSender,
      to: to,
      subject: subject,
      text: text,
    };

    await this.nodemailer.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

export default emailProvider;
