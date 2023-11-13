import { Component, Input, OnInit } from '@angular/core';
import { IWeatherDetails } from 'src/app/interfaces/weather';
import { TemperatureUnits } from 'src/app/pipes/temperature.pipe';

@Component({
  selector: 'app-place-day-weather',
  templateUrl: './place-day-weather.component.html',
  styleUrls: ['./place-day-weather.component.scss'],
})
export class PlaceDayWeatherComponent implements OnInit {

  @Input() public weatherDetails!: IWeatherDetails;
  @Input() public isToday = false;

  public readonly TemperatureUnits = TemperatureUnits;

  constructor() { }

  ngOnInit() { }

}
