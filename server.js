const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// تنظیم Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phantomairdrop3@gmail.com',
        pass: '@Soheyl1374'
    }
});

// کد تست ارسال ایمیل
transporter.sendMail({
    from: 'phantomairdrop3@gmail.com',
    to: 'testemail@example.com', // ایمیل مقصد خود را تغییر دهید
    subject: 'Test Email',
    text: 'This is a test email sent from Nodemailer.'
}, (err, info) => {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Info:', info);
    }
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
