import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICoordinates } from '../interfaces/coordinates';
import { IOneCallApiResponse } from '../interfaces/weather';
import { key } from '../key/openweathermap';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly openWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/';

  constructor(private httpClient: HttpClient) { }

  public fetchWeather(coordinates: ICoordinates): Promise<IOneCallApiResponse> {
    const url = `${this.openWeatherEndpoint}/onecall`;
    return this.httpClient.get<IOneCallApiResponse>(
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
