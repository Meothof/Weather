import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMillisecondsPipe } from './seconds-to-milliseconds.pipe';
import { TemperaturePipe } from './temperature.pipe';
import { DegreeToCardinalPipe } from './degree-to-cardinal.pipe';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    SecondsToMillisecondsPipe,
    TemperaturePipe,
    DegreeToCardinalPipe,
    SortPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SecondsToMillisecondsPipe,
    TemperaturePipe,
    DegreeToCardinalPipe,
    SortPipe,
  ]
})
export class PipesModule { }
