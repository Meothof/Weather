import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceWeatherOverviewComponent } from './place-weather-overview/place-weather-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PlaceWeatherOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PlaceRoutingModule {}
