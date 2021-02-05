import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
export class AppComponent implements OnInit {

  public places$: Observable<Index<IPlace>>;
  public selectedId: number;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private modalController: ModalController,
    private placeService: PlaceService,
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
    this.places$ = this.placeService.streamSavedPlaces();
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
