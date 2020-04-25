import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NominatimService } from 'src/app/services/nominatim.service';
import { IPlace } from 'src/app/interfaces/place';

@Component({
  selector: 'app-search-place',
  templateUrl: './search-place.component.html',
  styleUrls: ['./search-place.component.scss'],
})
export class SearchPlaceComponent implements OnInit {

  public searchResults: any[];

  constructor(
    private nominatimService: NominatimService,
    private modalController: ModalController,
    private storage: Storage,
    private toastController: ToastController,
  ) { }

  ngOnInit() { }

  public async searchPlace(event) {
    const searchValue = event.detail.value;
    this.searchResults = await this.nominatimService.fetchLocation(searchValue);
  }

  public async savePlace(place) {
    const places = (await this.storage.get('places') as IPlace[]) || [];
    places.push({
      name: place.display_name,
      coordinates: {
        latitude: place.lat,
        longitude: place.lon,
      }
    });
    this.storage.set('places', places);
    this.presentToast(place.display_name);
    this.close();
  }

  private async presentToast(placeName) {
    const toast = await this.toastController.create({
      message: `${placeName} saved`,
      duration: 2000
    });
    toast.present();
  }

  private close() {
    this.modalController.dismiss();
  }

}
