import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceWeatherOverviewComponent } from './place-weather-overview/place-weather-overview.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'weather-overview/:id',
    component: PlaceWeatherOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PlaceRoutingModule {}
