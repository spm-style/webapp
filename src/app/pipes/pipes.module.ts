import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelativeDatePipe } from './relative-date.pipe'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [RelativeDatePipe],
  declarations: [RelativeDatePipe]
})
export class PipesModule { }
