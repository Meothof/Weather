import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, Subject } from 'rxjs';
import { Index } from '../interfaces';
import { IPlace } from '../interfaces/place';

const PLACE_KEY = 'places';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private readonly savedPlaces$: Subject<Index<IPlace>>;

  constructor(private storage: Storage) {
    this.savedPlaces$ = new Subject();
    storage.ready().then(async () => {
      this.savedPlaces$.next(await this.fetchPlaces());
    });
  }

  public streamSavedPlaces(): Observable<Index<IPlace>> {
    return this.savedPlaces$.asObservable();
  }

  public async fetchPlaces(): Promise<Index<IPlace>> {
    return (await this.storage.get(PLACE_KEY) as Index<IPlace>) || {};
  }

  public async fetchPlaceById(id: number): Promise<IPlace> {
    const places = await this.fetchPlaces();
    return places[id];
  }

  public async addPlace(place: IPlace) {
    const places = await this.fetchPlaces();
    places[place.id] = place;
    await this.updatePlaces(places);
  }

  public async removePlace(place: IPlace) {
    const places = await this.fetchPlaces();
    delete places[place.id];
    await this.updatePlaces(places);
  }

  private async updatePlaces(places: Index<IPlace>): Promise<void> {
    this.savedPlaces$.next(places);
    await this.storage.set(PLACE_KEY, places);
  }

}
