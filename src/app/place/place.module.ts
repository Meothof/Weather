import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PlaceWeatherOverviewComponent } from './place-weather-overview/place-weather-overview.component';
import { PlaceRoutingModule } from './place-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PlaceWeatherOverviewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PlaceRoutingModule,
    RouterModule,
  ]
})
export class PlaceModule { }
