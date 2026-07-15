SkyCast – Weather Forecast Web Application

Description

SkyCast is a weather forecast web application that allows users to quickly check the current weather and view a 5-day forecast for cities around the world. The application uses the OpenWeatherMap API to provide real-time weather information through a clean, responsive, and interactive interface.

The application allows users to search for weather information by entering a city name.

After entering a city and pressing Enter, the application instantly displays:

- Current temperature
- "Feels like" temperature
- Weather conditions (e.g., Sunny, Rainy, Snowy)
- Daily minimum and maximum temperatures
- 5-day weather forecast
- GSAP-powered animations

Optional enhancements include dynamic backgrounds and icons that change according to the weather, providing a more engaging visual experience.

Live Demo

https://skycastlyweathora.netlify.app/ 

Screenshot

![Weather App Screenshot](./weather.png) 

Technologies Used

- JavaScript
- HTML
- CSS
- OpenWeatherMap API (for weather data)
- GSAP

How to Run the Project

No additional setup is required.

1. Clone the repository:
 bash 
git clone https://github.com/ktrn-s/weather-app

2. Open the project folder and open `index.html` in your browser.

Challenges and Learnings

This project helped strengthen my understanding of:

- Working with APIs and asynchronous JavaScript (fetch, async/await)
- Handling JSON data from real-world APIs
- DOM manipulation and dynamic UI updates
- Creating responsive and interactive user interfaces
- Adding animations using GSAP

A key challenge was correctly parsing the 5-day forecast data and displaying it in a clean format.

Future Improvements

- Hourly forecast view
- City autocomplete search
- Animated weather icons
- Additional weather information (humidity, wind speed, pressure)
- Improved mobile responsiveness
- Geolocation-based weather detection
- Sunrise and sunset times
