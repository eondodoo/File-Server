import nodemailer from 'nodemailer'
import env from '../env'

const sendEmail = (options: any)=>{
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'tukinettechnology@gmail.com',
            pass: env.PASSWORD,
        }
    })
    const message = {
        from: 'admin@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.text
    }
    transport.sendMail(message, (error)=>{
        if(error) throw error
    })
    console.log('message sent successfully')

}

export default sendEmail