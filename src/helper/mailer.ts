import nodemailer from "nodemailer";

interface MailProps {
  email : string;
  subject : string;
  mailType : "VERIFY" | "FORGOT_PASSWORD";
}

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "b18150725dfb1622e7131dd4d7b4360a"
  }
});

export async function sendMail({ email, subject, mailType } : MailProps) {
  
  try {

    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: email,
      subject: subject,
      html: "<b>Hello world?</b>",
    });
  
    console.log("Message sent: %s", info.messageId);
  
    return info;

  } catch (error) {
    console.log("An Error occured while sending email: ",error);
    return null;
  }
}