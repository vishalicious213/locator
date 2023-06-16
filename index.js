const button = document.getElementById("button")

// ⬇️ HELPERS ⬇️

async function getWeather() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        let lat = position.coords.latitude
        let lon = position.coords.longitude

        const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`)

        if (!response.ok) {
            throw new Error("Weather data not available")
        }

        const data = await response.json()
        renderApp(data)
    } catch (error) {
        console.error(error)
    }
}

// ⬇️ EVENT LISTENERS ⬇️

button.addEventListener("click", getWeather)

// ⬇️ RENDER APP ⬇️

function renderApp(data) {
    const weatherContainer = document.getElementById("weather-container")
    const locationContainer = document.getElementById("location-container")

    weatherContainer.innerHTML = `
        <div id="weather">
            <div class="weather-section">
                <div id="temp-img">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
                    <div id="temp">${Math.round(data.main.temp)}ºF</div>
                </div>
                <div id="temperatures">
                    <div id="temp-hi">Hi: ${Math.round(data.main.temp_max)}ºF</div>
                    <div id="temp-lo">Lo: ${Math.round(data.main.temp_min)}ºF</div>
                </div>
            </div>
            <div class="weather-section weather-inside">
                <div class="desc">Feels like: ${Math.round(data.main.feels_like)}ºF</div>
                <div class="desc">Humidity: ${data.main.humidity}</div>
                <div id="desc" class="desc">Weather: ${data.weather[0].description}</div>
            </div>
        </div>
    `

    locationContainer.innerHTML = `
        <div id="city" class="desc">${data.name}</div>    
    `
}

getWeather()