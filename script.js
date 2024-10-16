// variaveis
const apikey = "07ad16ff10fdbe917af6cd1963e31c2d"; 
const apiCountryURL = "https://flagsapi.com/:countrycode/flat/64.png";

const cityinput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data")

//funções
const getWeatherData = async (city) =>{

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
  
};
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  console.log(data)

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  descElement.innerText[0] = descElement.innerText[0].toUpperCase();
  weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute("src",`https://flagsapi.com/${data.sys.country}/flat/64.png`)
  humidityElement.innerText = `${data.main.humidity}%`
  windElement.innerText = `${data.wind.speed}km/h`

  weatherContainer.classList.remove("hide")
};
//eventos
searchBtn.addEventListener("click", (e) =>{ 
  e.preventDefault();

  const city = cityinput.value;

  showWeatherData(city);
});
cityinput.addEventListener("keyup", (e) =>{

if(e.code === "Enter"){
  const city = e.target.value
  showWeatherData(city)
}
})