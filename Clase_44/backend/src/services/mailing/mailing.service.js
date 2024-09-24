import { createTransport } from 'nodemailer';
import config from '../../../envConfig.js';
import { welcomeTemplate } from './templates/welcomeTemplate.js';
import { passwordResetTemplate } from './templates/passwordResetTemplate.js';
import { inactiveTemplate } from './templates/inactiveTemplate.js';

const transporter = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.EMAIL_GMAIL,
        pass: config.PASSWORD_GMAIL
    }
});

/**
 * 
 * @param {*} user 
 * @param {*} service register | resetPass
 * @param {*} token 
 * @returns 
 */
export const sendEmail = async (user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let msg = "";

        service === 'register' 
        ? (msg = welcomeTemplate(first_name, email) )
        : service === 'resetPass' 
        ? (msg = passwordResetTemplate(first_name, token) )
        : service === 'lastConnection'
        ? (msg = inactiveTemplate(first_name) )
        : (msg = "");


        const gmailOptions = {
            from: config.EMAIL_USER,
            to: email,
            subject: service 
                ==='register'
                ? 'Welcome to the Marce Store!' 
                : service 
                ==='resetPass'
                ? 'Marce Store - Password Reset'
                : service 
                === 'lastConnection'
                ? 'Marce Store - Inactive Account'
                : '',
            html: msg
        };

        const response = await transporter.sendMail(gmailOptions);
        if(token) return token;
        console.log(' mail sent to ' + response)
    } catch (error) {
        throw new Error(error);
    }
}