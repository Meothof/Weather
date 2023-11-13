import { Pipe, PipeTransform } from '@angular/core';

enum Cardinals {
  North = 'N',
  NorthWest = 'NW',
  West = 'W',
  SouthWest = 'SW',
  South = 'S',
  SouthEast = 'SE',
  East = 'E',
  NorthEast = 'NE',
}

@Pipe({
  name: 'degreeToCardinal'
})
export class DegreeToCardinalPipe implements PipeTransform {

  transform(value: number): Cardinals {
    if (value >= 337.5 && value < 360 || value >= 0 && value < 22.5) {
      return Cardinals.North;
    }
    if (value >= 22.5 && value < 67.5) {
      return Cardinals.NorthEast;
    }
    if (value >= 67.5 && value < 112.5) {
      return Cardinals.East;
    }
    if (value >= 112.5 && value < 157.5) {
      return Cardinals.SouthEast;
    }
    if (value >= 157.5 && value < 202.5) {
      return Cardinals.South;
    }
    if (value >= 202.5 && value < 247.5) {
      return Cardinals.SouthWest;
    }
    if (value >= 247.5 && value < 292.5) {
      return Cardinals.West;
    }
    if (value >= 292.5 && value < 337.5) {
      return Cardinals.NorthWest;
    }

    throw Error(`Invalid degree value`);
  }

}
