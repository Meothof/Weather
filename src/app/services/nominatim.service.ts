import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  private readonly nominatimeEndpoint = 'https://nominatim.openstreetmap.org';

  constructor(private httpClient: HttpClient) { }

  public fetchLocation(query: string): Promise<any[]> {
    const url = `${this.nominatimeEndpoint}/search`;
    return lastValueFrom(this.httpClient.get<any[]>(
      url,
      {
        params: {
          q: query,
          format: 'json'
        }
      },
    ));
  };
}
