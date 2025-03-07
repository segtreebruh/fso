import axios from "axios";

const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherAPI_key = import.meta.env.VITE_WEATHER_API_KEY;

const getAll = () => {
  const request = axios.get(allUrl);
  return request.then((response) => response.data);
};

const getWeather = (location) => {
  const encodedLocation = encodeURIComponent(location);
  const weatherAPI_url = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI_key}&q=${encodedLocation}&aqi=yes`;
  console.log("weather url", weatherAPI_url);
  const request = axios.get(weatherAPI_url);
  return request.then(response => response.data);
};

export default { getAll, getWeather };
