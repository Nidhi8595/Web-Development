
var h2 = document.querySelector("#first");
var button = document.getElementById("getWeather");
var detailedButton = document.getElementById("showDetailed");
var res = document.getElementById("weatherResult");
var detailedRes = document.getElementById("detailedWeatherResult");
var m = document.querySelector("#main");

// Set default background
m.classList.add('default-background');

button.addEventListener("click", function () {
    const city = document.getElementById("city").value;

    // Use your deployed backend URL to fetch the weather data
    const apiUrl = `https://web-development-2-9gzh.onrender.com/weather?city=${city}`;

    if (city) {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    h2.style.display = "none";
                    res.style.display = "block";
                    displayWeather(data);
                    updateBackground(data);
                    button.style.display = "none";
                    detailedButton.style.display = "block";  // Show detailed button
                    detailedRes.style.display = "none";
                } else {
                    res.innerHTML = "<p>City not found</p>";
                    detailedButton.style.display = "none";  // Hide detailed button if city is not found
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                res.innerHTML = "<p>Error fetching weather data</p>";
            });
    } else {
        res.innerHTML = "<p>Please enter a city</p>";
    }
});

detailedButton.addEventListener("click", function () {
    const city = document.getElementById("city").value;

    // Use your backend URL for detailed forecast
    const forecastUrl = `https://web-development-2-9gzh.onrender.com/forecast?city=${city}`;

    if (city) {
        fetch(forecastUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === "200") {
                    res.style.display = "none"; // Hide main weather details
                    detailedButton.style.display = "none";
                    detailedRes.style.display = "flex"; // Show detailed weather
                    displayDetailedWeather(data);
                    button.style.display = "inline";
                } else {
                    detailedRes.innerHTML = "<p>Error fetching forecast data</p>";
                }
            })
            .catch(error => {
                detailedRes.innerHTML = "<p>Error fetching forecast data</p>";
            });
    }
});


// Function to update background based on weather condition
function updateBackground(data) {

    m.classList.remove('day', 'night', 'dynamic-clear', 'dynamic-rain', 'dynamic-thunder', 'dynamic-sunset', 'cloudy', 'dynamic-fog', 'dynamic-haze', 'dynamic-sunny', 'dynamic-mist', 'default-background', 'clear-night', 'dynamic-sunrise', 'dynamic-snow');

    const currentTime = Math.floor(Date.now() / 1000);
    const sunriseTime = data.sys.sunrise;
    const sunsetTime = data.sys.sunset;

    if (currentTime >= sunriseTime && currentTime < sunsetTime) {
        m.classList.add('day');
    } else if (currentTime >= sunsetTime && currentTime < sunsetTime + 3600) {
        m.classList.add('dynamic-sunset');
    } else if (currentTime >= sunriseTime && currentTime < sunriseTime + 3600) {
        m.classList.add('dynamic-sunrise');
    } else {
        m.classList.add('night');
    }

    const weatherConditions = data.weather[0].main.toLowerCase();

    // const weatherCondition = weatherConditions.split(' ')[0];

    // Update background based on weather condition
    if ((weatherConditions.includes('clear')) && ((currentTime >= sunsetTime) && (currentTime < sunriseTime))) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise');
        m.classList.add('clear-night');
    }
    else if (weatherConditions.includes('clear')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-clear');
    }
    else if (weatherConditions.includes('rain')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-rain');
    }
    else if (weatherConditions.includes('clouds')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise');
        m.classList.add('cloudy');
    }
    else if (weatherConditions.includes('sunny')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-sunny');
    }
    else if (weatherConditions.includes('thunderstorm')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-thunder');
    }
    else if (weatherConditions.includes('fog')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-fog');
    }
    else if (weatherConditions.includes('haze')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-haze');
    }
    else if (weatherConditions.includes('mist')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-mist');
    }
    else if (weatherConditions.includes('snow')) {
        m.classList.remove('day', 'night', 'dynamic-sunset', 'dynamic-sunrise')
        m.classList.add('dynamic-snow');
    }

}

// Function to display current weather
function displayWeather(data) {
    const weatherInfo = `
        <h3 id="abc">Weather in ${data.name}</h3>
        <div id="weatherCard" class="weather-card">
            <p>Weather : ${data.weather[0].description}</p>
            <p>Temperature : ${data.main.temp}°C</p>
            <p>Humidity : ${data.main.humidity}%</p>
            <p>Wind Speed : ${data.wind.speed} m/s</p>
        </div>
    `;

    res.innerHTML = weatherInfo;

    const weatherCard = document.getElementById("weatherCard");
    const h3 = document.querySelector("#abc");

    h3.style.fontFamily = "monument";
    h3.style.fontWeight = "500";
    h3.style.transform = "scaleY(1.3)";
    h3.style.textShadow = "2px 2px 3px rgba(6, 6, 7, 0.652)";
    h3.style.textAlign = "center";
    h3.style.margin = "7px";

    weatherCard.style.margin = "5px";
    weatherCard.style.color = "black";
    weatherCard.style.fontWeight = "500";
    weatherCard.style.fontSize = "17px";
    weatherCard.style.textShadow = "2px 2px 3px rgba(6, 6, 7, 0.652)";
    weatherCard.style.lineHeight = "20px";
    weatherCard.style.textAlign = "left";
}


// Function to display 5-day detailed forecast
function displayDetailedWeather(data) {

    let forecastHTML = "";

    const forecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt).toLocaleDateString();
        const weatherCondition = forecast.weather[0].main.toLowerCase();

        const cardBackgroundClass = getCardBackgroundClass(weatherCondition);

        forecastHTML += `
            <div class="forecast-card ${cardBackgroundClass}">
                <p><strong>Date :</strong> ${date}</p>
                <p><strong>Weather :</strong> ${forecast.weather[0].description}</p>
                <p><strong>Temp :</strong> ${forecast.main.temp}°C</p>
                <p><strong>Humidity :</strong> ${forecast.main.humidity}%</p>
            </div>
        `;
    });

    detailedRes.innerHTML = forecastHTML;
}

// Function to return a background class based on weather condition
function getCardBackgroundClass(weatherCondition) {
    if (weatherCondition === 'clear') {
        return 'sunny-background';
    } else if (weatherCondition === 'rain') {
        return 'rainy-background';
    } else if (weatherCondition === 'clouds') {
        return 'cloudy-background';
    } else if (weatherCondition === 'thunderstorm') {
        return 'thunder-background';
    } else if (weatherCondition === 'snow') {
        return 'snowy-background';
    } else {
        return 'default-backg';
    }
}