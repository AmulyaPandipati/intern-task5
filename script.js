const apiKey = '7c1018c8315e9d7bfc5b096a53e5be6d'; // Replace with your OpenWeatherMap API key

document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchWeatherData(location);
    }
});

document.getElementById('currentLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(null, latitude, longitude);
            },
            error => alert("Unable to retrieve location. Please enter a location manually.")
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

function fetchWeatherData(location, lat = null, lon = null) {
    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;
    url += location ? `&q=${location}` : `&lat=${lat}&lon=${lon}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Location not found");
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}
