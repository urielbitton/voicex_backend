const nodemailer = require('nodemailer')

exports.sendEmail = async (email, url) => {
    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, 
            port: 465,
            secure: true, 
            requireTLS: true,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASSWORD, 
            }
        })
        let html = `
        <p>Hey ${email},</p>
        <p>We heard you're having trouble with your password. Uh-oh.</p>
        <p>Don’t worry though! You can use the following link to reset your password:</p>
        <a href=${url}>${url}</a>
        <p>This link expires in 1 hour. </p>
        <p>–Your friends at VoiceX</p>
        `

        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email, 
            subject: 'Reset Password', 
            html: html // html body
        })
        return 1
    } catch (err) { throw new Error(err)}
}
