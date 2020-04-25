import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IPlace } from './interfaces/place';
import { SearchPlaceComponent } from './place/search-place/search-place.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public places: IPlace[];
  public selectedPlace: IPlace;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private modalController: ModalController,
    private storage: Storage,
  ) {
    this.initializeApp();
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public async ngOnInit() {
    await this.refreshPlaces();
    if (this.places.length !== 0) {
      this.selectPlace(this.places[0]);
    }
  }

  public selectPlace(place) {
    this.selectedPlace = place;
    this.router.navigateByUrl(
      'place/weather-overview',
      { state: place }
    );
  }

  public async openSearch() {
    const modal = await this.modalController.create({
      component: SearchPlaceComponent
    });
    await modal.present();
    await modal.onWillDismiss();
    this.refreshPlaces();
  }

  private async refreshPlaces() {
    this.places = (await this.storage.get('places') as IPlace[]) || [];
  }
}
