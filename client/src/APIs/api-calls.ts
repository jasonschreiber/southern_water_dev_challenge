import axios from 'axios';

// Define the User type
interface WeatherPoint {
  name: string,
  region: string,
  country: string,
  lat: number,
  lon: number,
  localtime: string,
  location: string

}

const fetchWeather = async (city: string) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/getWeatherByTown?townName=${city}`);
        return (response.data);
      } catch (err) {
        console.log(`Failed to fetch weather for ${city}`);
      }
    };

export default fetchWeather;