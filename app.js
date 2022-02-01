// OpenWeatherMap API. Do not share it publicly.
const api = '82005d27a116c2880c8f0fcb866998a0'; //Replace with your API
const KELVIN = 273;
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");
const weather = {};
weather.temperature = {
    unit: "celsius"
}

window.addEventListener('load', () => {
    let long;
    let lat;
    //accessing geolocation of user
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            console.log(base);
            fetch(base)
                .then((response) => {
                    return response.json();

                })
                .then((data) => {
                    weather.temperature.value = Math.floor(data.main.temp);
                    weather.description = data.weather[0].description;
                    weather.iconID = data.weather[0].icon;
                    weather.city = data.name;
                    weather.country = data.sys.country;
                })
                .then(function() {
                    displayweather();
                });
        });
    }
});

function displayweather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconID}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
//c to f
function ctof(temperature) {
    return (temperature * 9 / 5) + 32;
}
//when user clicks on temp
tempElement.addEventListener("click", function() {
    if (weather.temperature.value === undefined)
        return;
    if (weather.temperature.unit === "celsius") {
        let fah = ctof(weather.temperature.value);
        fah = Math.floor(fah);
        tempElement.innerHTML = `${fah}&deg<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}&deg<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});