import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMillisecondsPipe } from './seconds-to-milliseconds.pipe';
import { TemperaturePipe } from './temperature.pipe';

@NgModule({
  declarations: [
    SecondsToMillisecondsPipe,
    TemperaturePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SecondsToMillisecondsPipe,
    TemperaturePipe
  ]
})
export class PipesModule { }
