const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// استفاده از پوشه public برای فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'public')));

// مسیر اصلی
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// شروع سرور
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
