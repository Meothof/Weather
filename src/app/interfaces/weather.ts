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
  temp: any;
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

export interface IWeatherForecast extends IWeatherDetails {
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn; number;
  };
}

export interface IOneCallApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  current: IWeatherDetails;
  hourly: IWeatherForecast[];
  daily: IWeatherForecast[];
}
