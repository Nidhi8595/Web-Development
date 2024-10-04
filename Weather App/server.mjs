import 'dotenv/config';  // Load environment variables
import express from 'express';
import fetch from 'node-fetch';  // Use import for node-fetch
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());  // Middleware to parse JSON

// Route for current weather
app.get('/weather', async (req, res) => {
    const city = req.query.city;  // Get city from query params
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod !== 200) {
            return res.status(data.cod).json({ error: data.message });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Route for weather forecast (5-day)
app.get('/forecast', async (req, res) => {
    const city = req.query.city;  // Get city from query params
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod !== "200") {
            return res.status(data.cod).json({ error: data.message });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
