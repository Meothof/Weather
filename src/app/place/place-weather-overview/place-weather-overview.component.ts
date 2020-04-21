import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IPlace } from 'src/app/interfaces/place';
import { NominatimService } from 'src/app/services/nominatim.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-place-weather-overview',
  templateUrl: './place-weather-overview.component.html',
  styleUrls: ['./place-weather-overview.component.scss'],
})
export class PlaceWeatherOverviewComponent implements OnInit, OnDestroy {

  public place: IPlace;
  public weather: any;

  private readonly destroyed: Subject<void>;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private nominatimeSerivce: NominatimService,
  ) {
    this.destroyed = new Subject();
  }

  public ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.refresh();
    });
  }

  public ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private refresh() {
    this.place = history.state;
  }

}
