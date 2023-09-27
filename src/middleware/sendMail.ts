import * as nodemailer from "nodemailer";
import env from "../env";

export const sendMail = (file:any, email: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL,
      pass: env.PASSWORD,
    },  
  });

  const mailOptions = {
    from: env.EMAIL,
    to: email,
    subject: "your file is ready",
    text: "hello",
    attachments: [
      {
        filename: file,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("File sent");
    }
  });
};
