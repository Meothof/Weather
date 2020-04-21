import { Pipe, PipeTransform } from '@angular/core';

export enum TemperatureUnits {
  CELCIUS = 'c',
  KELVIN = 'k',
}

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(temperature: number, inputUnit: TemperatureUnits, outputUnit: TemperatureUnits): any {
    if (outputUnit === TemperatureUnits.CELCIUS) {
      let celciusTemp: number;
      if (inputUnit === TemperatureUnits.KELVIN) {
        celciusTemp = this.kelvinToCelius(temperature);
      }
      return this.toCelciusString(celciusTemp);
    }
  }

  private kelvinToCelius(temperature: number): number {
    return temperature - 273.15;
  }

  private toCelciusString(temperature: number): string {
    return `${Math.round(temperature)}°C`;
  }
}
