const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_KEY)
exports.sendEmail = async (email, subject, html) => {
    try {
        if (email && subject && html) {
            const msg = {
                to: email,
                from: process.env.EMAIL_USER,
                subject: subject,
                html: html
            }
            //send email using SendGrid
            sgMail.send(msg)
        } else {
            throw new Error(`Email parameters not provided`)
        }
        return
    } catch (err) {
        throw new Error(err)
    }
}