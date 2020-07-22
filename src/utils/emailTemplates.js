exports.getResetPasswordTemplate = (user, url) =>{
    return `
    <p>Hey ${user.displayName || user.email},</p>
    <p>We heard you're having trouble with your password. Uh-oh.</p>
    <p>Don’t worry though! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>This link expires in 1 hour. </p>
    <p>–Your friends at VoiceX</p>
    `
}