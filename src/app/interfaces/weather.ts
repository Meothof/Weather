export interface IWeatherOverview {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherDetails {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: IWeatherOverview[];
}

export interface IOneCallApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  current: IWeatherDetails;
  hourly: IWeatherDetails[];
  daily: IWeatherDetails[];
}
