import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NominatimService } from 'src/app/services/nominatim.service';
import { PlaceService } from 'src/app/services/place.service';

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
    private placeService: PlaceService,
    private toastController: ToastController,
  ) { }

  ngOnInit() { }

  public async searchPlace(event) {
    const searchValue = event.detail.value;
    this.searchResults = await this.nominatimService.fetchLocation(searchValue);
    console.log(this.searchResults)
  }

  public async savePlace(place) {
    await this.placeService.addPlace({
      id: place.place_id,
      name: place.display_name,
      coordinates: {
        latitude: place.lat,
        longitude: place.lon,
      }
    });
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
