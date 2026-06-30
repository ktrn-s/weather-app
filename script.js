//gsap
gsap.to("body",{
    background:"linear-gradient(180deg,#4facfe,#00f2fe)",
    duration:1.5
});

gsap.from("#branding", {
    rotation: -30,
    scale: .4,
    opacity: 0,
    duration: 1.3,
    ease:"elastic.out(1,0.6)"
});
gsap.from("#welcome", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.3
})

gsap.to("#featured", {
    y: -10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
//?not sure to keep
// gsap.to("#header", {
//     y: -4,
//     duration: 3,
//     repeat: -1,
//     yoyo: true,
//     ease: "sine.inOut"
// })

const api = {
    //link
    endpoint:"https://api.openweathermap.org/data/2.5/",
    //API key
    key: "e73a76eecedc0954f83b82e5d43455f9"
}


const input = document.querySelector("#input");
const searchBtn = document.querySelector("#search-btn");
input.addEventListener("keypress", enter);
searchBtn.addEventListener("click", searchCity);
//gsap
searchBtn.addEventListener("mouseenter",()=>{
    gsap.to(searchBtn,{
        scale:1.08,
        duration:.2,
        ease: "power2.out"
    });
});
searchBtn.addEventListener("mouseleave",()=>{
    gsap.to(searchBtn,{
        scale:1,
        duration:.2,
        ease: "power2.out"
    });
});

function enter(e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
        getInfo(input.value);
    }
}

function searchCity() {
    if(input.value.trim() !== ""){
        getInfo(input.value);
    }
}

async function getInfo (data) {
    const res = await fetch(
        `${api.endpoint}forecast?q=${data}&units=metric&appid=${api.key}`
    );
    const result = await res.json();
    console.log(result);
    displayResult(result);
    displayForecast(result);
}

function displayResult(result) {
    //showing 
    document.querySelector("#weather-card").style.display = "block";
    document.querySelector("#forecast").style.display = "flex";
    document.querySelector("#welcome").style.display = "none";
    //GSAP: this one glitches still  !!!!!!
    gsap.from("#weather-card",{
    y:40,
    opacity:0,
    duration:.8,
    ease:"power3.out"
});
//     gsap.from(".card", {
//     opacity:0,
//     y:30,
//     duration:.6,
//     stagger:.12,
//     ease:"back.out(1.7)"
// });

    

    //time
    let time = document.querySelector("#time");
    time.textContent = getCityTime(result.city.timezone);

    // // first forecast 
    let weather = result.list[0];
    const icon = getWeatherIcon(weather.weather[0].main);
    setBackground(weather.weather[0].main);
    // city
    let city = document.querySelector("#city");
    city.textContent = `${result.city.name}, ${result.city.country}`;
    //date
    getOurDate();
    //temperature
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°</span>`;
    //gsap
        gsap.from("#temperature", {
        scale:0.6,
        opacity:0,
        duration:.7,
        ease:"back.out(2)"
    });
    //feels like
    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `${Math.round(weather.main.feels_like)}<span>°</span>`;
    //conditions
    let conditions = document.querySelector("#conditions");
    conditions.textContent =`${icon} ${weather.weather[0].main}`;
    //min max
    let variations = document.querySelector("#variations");
    variations.innerHTML = 
        `Min: ${Math.round(weather.main.temp_min)}<span>°</span>
        Max:${Math.round(weather.main.temp_max)}<span>°</span>` ;
}
//showing 3 days forecast
function displayForecast(result) {
    const forecast = document.querySelector("#forecast");
    forecast.innerHTML = "";

    // every 8 items = 24 hours
    for(let i = 0; i < result.list.length; i += 8) {
        const item = result.list[i];
        // date
        const date = new Date(item.dt_txt);
        // day names
        const days = [
            "Sun", "Mon", "Tue",
            "Wed", "Thu", "Fri", "Sat"
        ];
        const day = days[date.getDay()];
        const icon = getWeatherIcon(item.weather[0].main);
        forecast.innerHTML += `
        <div class="card">
            <h3>${day}</h3>
            <p style="font-size: 22px">${icon}</p>
            <p>
            ${Math.round(item.main.temp)}°
            </p>
            <p>
            ${item.weather[0].main}
            </p>
        </div>
        `;
    }
}


function getOurDate(){
    const myDate = new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let day = days[myDate.getDay()];
    console.log(day);

    let todayDate = myDate.getDate();
    console.log(todayDate);

    let month = months[myDate.getMonth()];
    console.log(month);

    let year = myDate.getFullYear();
    console.log(year);

    let showDate = document.querySelector("#date");
    showDate.innerHTML =
    `${day} ${todayDate} ${month} ${year}`;
    // showDate.innerHTML = `${day}`+` `+`${todayDate}`+` `+`${month}`+` `+`${year}`;
}

function setBackground(condition) {

    const body = document.body;

    if (condition === "Clear") {
        body.style.background =
        "linear-gradient(180deg, #4facfe, #00f2fe)";
    }

    else if (condition === "Rain") {
        body.style.background =
        "linear-gradient(180deg, #2c3e50, #4ca1af)";
    }

    else if (condition === "Snow") {
        body.style.background =
        "linear-gradient(180deg, #e6dada, #274046)";
    }

    else {
        body.style.background =
        "linear-gradient(180deg, #1e293b, #0f172a)";
    }
}

function getWeatherIcon(condition) {

    if (condition === "Clear") return "☀️";
    if (condition === "Rain") return "🌧";
    if (condition === "Snow") return "❄️";
    if (condition === "Clouds") return "☁️";

    return "🌡️";
}

//time
// function getTime() {
//     const now = new Date();

//     let hours = now.getHours();
//     let minutes = now.getMinutes();

//     if (minutes < 10) minutes = "0" + minutes;

//     return `${hours}:${minutes}`;
// }

function getCityTime(timezoneOffsetSeconds) {

    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;

    const cityTime = new Date(utc + timezoneOffsetSeconds * 1000);

    let hours = cityTime.getHours();
    let minutes = cityTime.getMinutes();

    if (minutes < 10) minutes = "0" + minutes;

    return `${hours}:${minutes}`;
}

//default city
const featuredCities = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Sydney",
    "Rome",
    "Berlin",
    "Dubai"
];
function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * featuredCities.length);
    return featuredCities[randomIndex];
}
async function loadFeaturedCity() {

    try {

        const city = getRandomCity();

        const res = await fetch(
            `${api.endpoint}forecast?q=${city}&units=metric&appid=${api.key}`
        );

        if (!res.ok) {
            throw new Error("API request failed");
        }

        const result = await res.json();

        if (!result.list || result.list.length === 0) {
            return;
        }

        const weather = result.list[0];

        document.querySelector("#featured-city")
            .textContent = result.city.name;

        document.querySelector("#featured-temp")
            .textContent =
            `${Math.round(weather.main.temp)}°`;

        document.querySelector("#featured-condition")
            .textContent =
            weather.weather[0].main;

    } catch (error) {
        console.log("Featured city error:", error);

        document.querySelector("#featured-city")
            .textContent = "Unable to load";

        document.querySelector("#featured-temp")
            .textContent = "--";

        document.querySelector("#featured-condition")
            .textContent = "";
    }
}
loadFeaturedCity();
