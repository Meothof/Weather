import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToMillisecondsPipe } from './seconds-to-milliseconds.pipe';

@NgModule({
  declarations: [SecondsToMillisecondsPipe],
  imports: [
    CommonModule
  ],
  exports: [SecondsToMillisecondsPipe]
})
export class PipesModule { }
