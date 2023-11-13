import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { IPlace } from 'src/app/interfaces/place';
import { IOneCallApiResponse, IWeatherForecast } from 'src/app/interfaces/weather';
import { PlaceService } from 'src/app/services/place.service';
import { WeatherService } from '../../services/weather.service';
import { PlaceWeatherDetailsComponent } from '../place-weather-details/place-weather-details.component';

@Component({
  selector: 'app-place-weather-overview',
  templateUrl: './place-weather-overview.component.html',
  styleUrls: ['./place-weather-overview.component.scss'],
})
export class PlaceWeatherOverviewComponent implements OnInit, OnDestroy {

  public place?: IPlace;
  public weather?: IOneCallApiResponse;

  private readonly destroyed: Subject<void>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private placeService: PlaceService,
  ) {
    this.destroyed = new Subject();
  }

  public async ngOnInit() {
    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId == null) {
      return;
    }
    this.place = await this.placeService.fetchPlaceById(+placeId);
    await this.refresh();
  }

  public ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public async refresh(event?: any): Promise<void> {
    if (this.place != null) {
      this.weather = await this.weatherService.fetchWeather(this.place.coordinates);
    }
    if (event) {
      event.target.complete();
    }
  }

  public async openForecastDetails(weather: IWeatherForecast) {
    const modal = await this.modalController.create({
      component: PlaceWeatherDetailsComponent,
      componentProps: {
        weatherForecast: weather,
        placeName: this.place?.name,
      }
    });
    await modal.present();
  }

  public async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.place?.name,
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
    if (this.place == null) {
      return;
    }
    await this.placeService.removePlace(this.place);
    this.router.navigateByUrl('');
  }

}
