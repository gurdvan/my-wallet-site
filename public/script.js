// Countdown timer
const countdown = document.getElementById('countdown');
let remainingDays = 30;

function updateCountdown() {
    countdown.textContent = `Days remaining: ${remainingDays}`;
    if (remainingDays > 0) remainingDays--;
}
setInterval(updateCountdown, 86400000); // Updates every 24 hours
updateCountdown();

// Fetch crypto prices
const cryptoPrices = document.getElementById('cryptoPrices');
async function fetchCryptoPrices() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd');
    const data = await response.json();
    cryptoPrices.innerHTML = `
        <h2>Crypto Prices</h2>
        <ul>
            <li>Bitcoin: $${data.bitcoin.usd}</li>
            <li>Ethereum: $${data.ethereum.usd}</li>
            <li>Solana: $${data.solana.usd}</li>
            <li>Binance Coin: $${data.binancecoin.usd}</li>
        </ul>
    `;
}
fetchCryptoPrices();
