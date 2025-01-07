// قیمت اولیه
let prices = [0.001];

// تولید داده‌های اولیه برای 30 روز
for (let i = 1; i < 30; i++) {
    const increment = Math.random() * (100 - prices[i - 1]) / (30 - i);
    prices.push(prices[i - 1] + increment);
}

// تولید عدد رندوم برای آپدیت
const randomUpdate = () => {
    return Math.random() * (0.02 - 0.002) + 0.002;
};

// به‌روزرسانی قیمت
const lastPrice = prices[prices.length - 1] + randomUpdate();
prices.push(lastPrice);

// ایجاد برچسب‌های زمانی
const labels = Array.from({ length: prices.length }, (_, i) => `Day ${i + 1}`);

// رسم نمودار
const ctx = document.getElementById('ftmChart').getContext('2d');
const ftmChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'FTM Price (USD)',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // جلوگیری از نسبت ثابت
    }
});
