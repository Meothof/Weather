import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { key } from '../key/openweathermap';
import { ICoordinates } from '../interfaces/coordinates';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly openWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/';

  constructor(private httpClient: HttpClient) { }

  public fetchWeather(coordinates: ICoordinates) {
    const url = `${this.openWeatherEndpoint}/onecall`;
    return this.httpClient.get(
      url,
      {
        params: {
          lat: coordinates.latitude,
          lon: coordinates.longitude,
          appId: key
        }
      },
    ).toPromise();
  }
}
