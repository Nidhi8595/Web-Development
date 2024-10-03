import 'dotenv/config';  // Load environment variables

import express from 'express';
import fetch from 'node-fetch';  // Use import for node-fetch

const app = express();

const cors = require('cors');

const PORT = 3000;

app.use(cors());

app.use(express.json());  // Middleware to parse JSON

// Example route
app.get('/', (req, res) => {
    res.send('Weather App Backend is Running!');
});

// Example fetch request
app.get('/weather', async (req, res) => {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=' + process.env.OPENWEATHER_API_KEY);
    const data = await response.json();
    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
