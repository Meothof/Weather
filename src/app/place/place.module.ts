import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlaceRoutingModule } from './place-routing.module';
import { PlaceWeatherOverviewComponent } from './place-weather-overview/place-weather-overview.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PlaceWeatherOverviewComponent],
  imports: [
    CommonModule,
    IonicModule,
    PlaceRoutingModule
  ]
})
export class PlaceModule { }
