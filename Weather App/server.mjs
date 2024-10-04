import 'dotenv/config';  // Load environment variables from .env file
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());  // Middleware to parse JSON

// Route to handle weather data requests
app.get('/weather', async (req, res) => {
    const city = req.query.city;  // Fetch city from query parameter

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
        // Backend uses API key from process.env (not exposed to frontend)
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;
        console.log(`API Request: ${apiUrl}`);  // Debug log

        // Fetch weather data from OpenWeather API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the API response is successful
        if (data.cod !== 200) {
            return res.status(data.cod).json({ error: data.message });
        }

        // Send weather data back to frontend
        res.json(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

