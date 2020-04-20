import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { Location } from '@angular/common';
import { NominatimService } from 'src/app/services/nominatim.service';

@Component({
  selector: 'app-place-weather-overview',
  templateUrl: './place-weather-overview.component.html',
  styleUrls: ['./place-weather-overview.component.scss'],
})
export class PlaceWeatherOverviewComponent implements OnInit {

  public place: string;
  public latitude: string;
  public longitude: string;

  public weather: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private location: Location,
    private nominatimeSerivce: NominatimService,
  ) {
  }

  async ngOnInit() {
    this.place = this.activatedRoute.snapshot.paramMap.get('id');
    const state = this.location.getState() as any;
    // this.weather = await this.weatherService.fetchWeather(state.latitude, state.longitude);
    // console.log(this.weather);

    // Test
    this.nominatimeSerivce.fetchLocation(this.place).then(console.log)
  }

}
