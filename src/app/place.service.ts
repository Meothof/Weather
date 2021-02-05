import { Injectable } from '@angular/core';
import { IPlace } from './interfaces/place';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private readonly storageKey = 'places';

  constructor(private storage: Storage) { }

  public async fetchPlaces(): Promise<IPlace[]> {
    return (await this.storage.get('places') as IPlace[]) || [];
  }

  public async addPlace(place: IPlace) {
    const places = await this.fetchPlaces();
    places.push(place);
    await this.storage.set('places', places);
  }

  public async removePlace(place: IPlace) {
    const places = await this.fetchPlaces();
    await this.storage.set('places', places.filter(p => p.name !== place.name && p.coordinates !== place.coordinates));
  }

}
