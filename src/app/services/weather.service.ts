import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { key } from '../key/openweathermap';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly openWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/';

  constructor(private httpClient: HttpClient) { }

  public fetchWeather(latitude: string, longitude: string) {
    const url = `${this.openWeatherEndpoint}/onecall`;
    return this.httpClient.get(
      url,
      {
        params: {
          lat: latitude,
          lon: longitude,
          appId: key
        }
      },
    ).toPromise();
  }
}
