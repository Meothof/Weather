import { IWeatherDetails, IWeatherOverview } from 'src/app/interfaces/weather';

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-place-day-weather',
  templateUrl: './place-day-weather.component.html',
  styleUrls: ['./place-day-weather.component.scss'],
})
export class PlaceDayWeatherComponent implements OnInit {

  @Input() public weatherDetails: IWeatherDetails;
  @Input() public isToday = false;

  constructor() { }

  ngOnInit() { }

}
