const prices = {
    btc: document.getElementById('btc-price'),
    eth: document.getElementById('eth-price'),
    sol: document.getElementById('sol-price'),
    bnb: document.getElementById('bnb-price'),
};

const fetchPrices = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd');
        const data = await response.json();

        prices.btc.textContent = `$${data.bitcoin.usd}`;
        prices.eth.textContent = `$${data.ethereum.usd}`;
        prices.sol.textContent = `$${data.solana.usd}`;
        prices.bnb.textContent = `$${data.binancecoin.usd}`;
    } catch (error) {
        console.error('Failed to fetch prices:', error);
    }
};

const countdown = () => {
    const endTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime();

    const timerInterval = setInterval(() => {
        const now = Date.now();
        const timeLeft = endTime - now;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').textContent = 'Time is up!';
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('timer').textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        }
    }, 1000);
};

fetchPrices();
countdown();
