import { Component, OnInit, Input } from '@angular/core';
import { IWeatherForecast } from 'src/app/interfaces/weather';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-place-weather-details',
  templateUrl: './place-weather-details.component.html',
  styleUrls: ['./place-weather-details.component.scss'],
})
export class PlaceWeatherDetailsComponent implements OnInit {

  @Input() public weatherForecast: IWeatherForecast;
  @Input() public placeName: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public dismissModal() {
    this.modalController.dismiss();
  }

}
