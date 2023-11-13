import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { ModalController, Platform } from '@ionic/angular';
import { Observable, firstValueFrom, lastValueFrom, take, takeLast } from 'rxjs';
import { Index } from './interfaces';
import { IPlace } from './interfaces/place';
import { SearchPlaceComponent } from './place/search-place/search-place.component';
import { PlaceService } from './services/place.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  protected places$: Observable<Record<number, IPlace>>;

  constructor(
    private platform: Platform,
    private router: Router,
    private modalController: ModalController,
    private placeService: PlaceService,
  ) {
    this.initializeApp();
    this.places$ = this.placeService.streamSavedPlaces();
    this.loadFirstAvailablePlace();
  }

  public async initializeApp() {
    // Load app
    // await this.platform.ready()
    // StatusBar.show();
    // SplashScreen.hide();
    // Open first place
  }

  private async loadFirstAvailablePlace() {
    const places = await firstValueFrom(this.places$);
    const placesIds = Object.keys(places);
    if (placesIds.length > 0) {
      this.selectPlace(+placesIds[0]);
    }
  }


  public async openSearch() {
    const modal = await this.modalController.create({
      component: SearchPlaceComponent
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  public selectPlace(placeId: number) {
    this.router.navigate(['place/weather-overview', placeId]);
  }
}
