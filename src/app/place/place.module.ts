import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PlaceWeatherOverviewComponent } from './place-weather-overview/place-weather-overview.component';
import { PlaceRoutingModule } from './place-routing.module';
import { RouterModule } from '@angular/router';
import { PlaceDayWeatherComponent } from './place-day-weather/place-day-weather.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    PlaceWeatherOverviewComponent,
    PlaceDayWeatherComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PlaceRoutingModule,
    RouterModule,
    PipesModule
  ]
})
export class PlaceModule { }
