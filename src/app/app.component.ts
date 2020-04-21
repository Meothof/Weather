import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { IPlace } from './interfaces/place';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public places: IPlace[] = [
    {
      name: 'Montreal',
      coordinates: {
        latitude: '45.508888',
        longitude: '-73.561668',
      }
    },
    {
      name: 'Paris',
      coordinates: {
        latitude: '48.866667',
        longitude: '2.333333',
      }
    },
  ];
  public selectedPlace: IPlace;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
  ) {
    this.initializeApp();
  }

  public initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public ngOnInit() {
    this.selectPlace(this.places[0]);
  }

  public selectPlace(place) {
    this.selectedPlace = place;
    this.router.navigateByUrl(
      'place',
      { state: place }
    );
  }
}
