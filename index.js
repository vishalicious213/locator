const button = document.getElementById("button")
let map, infoWindow

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

function initMap() {
    console.log("MAPPING")
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    })
    infoWindow = new google.maps.InfoWindow()

    const locationButton = document.createElement("button")

    locationButton.textContent = "Pan to Current Location"
    locationButton.classList.add("custom-map-control-button")
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            }

            infoWindow.setPosition(pos)
            infoWindow.setContent("Location found.")
            infoWindow.open(map)
            map.setCenter(pos)
        },
        () => {
            handleLocationError(true, infoWindow, map.getCenter())
        }
        )
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter())
    }
    })
}
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    )
    infoWindow.open(map)
  }

getWeather()
window.initMap = initMap
initMap()