const nodemailer = require('nodemailer')

exports.sendEmail = async (email, subject, html) => {
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
                pass: process.env.EMAIL_PASSWORD
            }
        })
        if (email && subject && html) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: html // html body
            })
        }
        else {
            throw new Error(`Email parameters not provided`)
        }
        return
    } catch (err) {
        throw new Error(err)
    }
}
