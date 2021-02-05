import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IPlace } from 'src/app/interfaces/place';
import { IOneCallApiResponse, IWeatherForecast } from 'src/app/interfaces/weather';
import { PlaceService } from 'src/app/place.service';
import { WeatherService } from '../../services/weather.service';
import { PlaceWeatherDetailsComponent } from '../place-weather-details/place-weather-details.component';

@Component({
  selector: 'app-place-weather-overview',
  templateUrl: './place-weather-overview.component.html',
  styleUrls: ['./place-weather-overview.component.scss'],
})
export class PlaceWeatherOverviewComponent implements OnInit, OnDestroy {

  public place: IPlace;
  public weather: IOneCallApiResponse;

  private readonly destroyed: Subject<void>;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private placeService: PlaceService,
  ) {
    this.destroyed = new Subject();
  }

  public ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      const place = history.state.place;
      if (place != null) {
        this.place = place;
        this.refresh();
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public async refresh(event?: any) {
    this.weather = await this.weatherService.fetchWeather(this.place.coordinates);
    if (event) {
      event.target.complete();
    }
  }

  public async openForecastDetails(weather: IWeatherForecast) {
    const modal = await this.modalController.create({
      component: PlaceWeatherDetailsComponent,
      componentProps: {
        weatherForecast: weather,
        placeName: this.place.name,
      }
    });
    await modal.present();
  }

  public async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.place.name,
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.deletePlace();
        }
      }]
    });
    await actionSheet.present();
  }

  private async deletePlace() {
    await this.placeService.removePlace(this.place);
    this.router.navigateByUrl('');
  }

}
