import axios from "axios";

// https://api.open-meteo.com/v1/forecast?latitude=19.08&longitude=72.89&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FChicago

export function getWeather(lat, lon, timezone) {
  return axios.get(
    "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&precipitation_unit=inch&timeformat=unixtime&",
    {
      params: {
        latitude: lat,
        longitude: lon,
        timezone,
      },
    }
  ).then(({data}) {
    return {
      current: parseCurrentWeather(data),
      daily: parseDailyWeather(data),
      hourly: parseHourlyWeather(data)
    }
  })
}