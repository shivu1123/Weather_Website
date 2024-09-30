// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeather');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const loading = document.getElementById('loading');
    const weatherIcon = document.getElementById('weatherIcon');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const body = document.body;

    const apiKey = '2e3f62c66ebb4231a8534233242909'; // Your API key
    const apiUrl = 'https://api.weatherapi.com/v1/current.json';

    getWeatherButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city === '') {
            alert('Please enter a city name.');
            return;
        }

        // Show loading animation
        loading.style.display = 'block';
        weatherInfo.style.display = 'none';

        // Fetch weather data from API
        fetch(`${apiUrl}?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                // Update weather information
                cityName.textContent = data.location.name + ', ' + data.location.country;
                temperature.textContent = `${data.current.temp_c}°C / ${data.current.temp_f}°F`;
                description.textContent = data.current.condition.text;

                // Update weather icon
                const iconUrl = `https:${data.current.condition.icon}`;
                weatherIcon.src = iconUrl;
                weatherIcon.alt = data.current.condition.text;

                // Update background image dynamically based on weather condition
                const condition = data.current.condition.code;
                let backgroundImage = '';

                // Define background images based on WeatherAPI condition codes
                // Reference: https://www.weatherapi.com/docs/weather_conditions.json
                if (condition === 1000) { // Sunny/Clear
                    backgroundImage = 'url("https://images.unsplash.com/photo-1641187959749-1504b9d14ec2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
                } else if ([1003, 1006, 1009].includes(condition)) { // Partly Cloudy to Cloudy
                    backgroundImage = 'url("https://images.unsplash.com/photo-1499346030926-9a72daac6c63?&auto=format&fit=crop&w=1350&q=80")';
                } else if ([1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195].includes(condition)) { // Rainy
                    backgroundImage = 'url("https://images.unsplash.com/photo-1527766833261-b09c3163a791?&auto=format&fit=crop&w=1350&q=80")';
                } else if ([1066, 1069, 1072].includes(condition)) { // Snowy
                    backgroundImage = 'url("https://images.unsplash.com/photo-1603052875291-14b4d0ab43f1?&auto=format&fit=crop&w=1350&q=80")';
                } else if ([1135, 1147].includes(condition)) { // Fog
                    backgroundImage = 'url("https://images.unsplash.com/photo-1502082553048-f009c37129b9?&auto=format&fit=crop&w=1350&q=80")';
                } else {
                    // Default background
                    backgroundImage = 'url("https://images.unsplash.com/photo-1501973801540-537f08ccae7b?&auto=format&fit=crop&w=1350&q=80")';
                }

                body.style.backgroundImage = backgroundImage;

                // Show weather info and hide loading
                loading.style.display = 'none';
                weatherInfo.style.display = 'block';
            })
            .catch(error => {
                loading.style.display = 'none';
                weatherInfo.style.display = 'none';
                alert(error.message);
            });
    });

    // Allow pressing "Enter" to fetch weather
    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeatherButton.click();
        }
    });
});
