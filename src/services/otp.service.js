import nodemailer from 'nodemailer'
import oAuth2Client from '../utils/oauth';
import client from '../utils/redis';
import { config } from '../../config/env';

const sendOTP = async (receiver,otp) => {

	const accessToken = await oAuth2Client.getAccessToken();

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: 'vanshdubey101963@gmail.com',
			clientId: config.clientId,
			clientSecret: config.clientSecret,
			refreshToken: config.refreshToken,
			accessToken: accessToken.token
		 }
	});

    const receiverName = receiver.split("@gmail")[0];

	const mailOptions = {
		from: 'vanshdubey101963@gmail.com',
		to: receiver,
		subject: 'Your One-Time Password (OTP) for Verification',
		text: `Dear ${receiverName},

        Thank you for choosing SkillLink.
        
        To proceed with your verification, please use the following One-Time Password (OTP):
        
        🔐 Your OTP: ${otp}
        
        This OTP is valid for 5 minutes. Please do not share this code with anyone. If you did not request this verification, please ignore this email.
        
        For security reasons, this OTP can only be used once. If your session expires, you can request a new one.
        
        If you have any questions, feel free to contact our support team at [support@email.com].
        
        Best Regards,
        Skilllink`
	  };
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.error("Error:", error);
		  }
		  return info.accepted.length > 0;
	});
}

const saveOTP = (userId, otp) => {
    client.SET(`otp:${userId}`, 300, otp);
}

const  verifyOTP = (userId, inputOtp, callback) => {
	client.GET(`otp:${userId}`, (err, storedOtp) => {
	  if (err || !storedOtp) return callback(false); 
	  callback(storedOtp === inputOtp);
	});
}

const generateOTP = (length = 6) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString().slice(0, length);
}

export {generateOTP,verifyOTP,saveOTP,sendOTP}
