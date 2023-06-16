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
        renderWeather(data)
    } catch (error) {
        console.error(error)
    }
}

// ⬇️ RENDER APP ⬇️

