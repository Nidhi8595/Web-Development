require('dotenv').config();
// Import required modules
const express = require('express');
const fetch = require('node-fetch');  // We'll use this to make API requests
require('dotenv').config();  // To use variables from .env

const app = express();
const PORT = 3000;

// Route to fetch weather data
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'London';  // Use a default city if none is provided
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    res.json(data);  // Send the weather data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
