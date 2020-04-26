import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMillisecondsPipe } from './seconds-to-milliseconds.pipe';
import { TemperaturePipe } from './temperature.pipe';
import { DegreeToCardinalPipe } from './degree-to-cardinal.pipe';

@NgModule({
  declarations: [
    SecondsToMillisecondsPipe,
    TemperaturePipe,
    DegreeToCardinalPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SecondsToMillisecondsPipe,
    TemperaturePipe,
    DegreeToCardinalPipe,
  ]
})
export class PipesModule { }
