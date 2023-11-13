import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { ModalController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
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

  protected places$: Observable<Index<IPlace>>;
  protected selectedId: number | undefined;

  constructor(
    private platform: Platform,
    private router: Router,
    private modalController: ModalController,
    private placeService: PlaceService,
  ) {
    this.initializeApp();
    this.places$ = this.placeService.streamSavedPlaces();
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.show();
      SplashScreen.hide();
    });
  }

  public async openSearch() {
    const modal = await this.modalController.create({
      component: SearchPlaceComponent
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  public selectePlace(placeId: number) {
    this.selectedId = placeId;
    this.router.navigate(['place/weather-overview', placeId]);
  }
}
