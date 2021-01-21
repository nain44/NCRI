import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [SearchPipe],
  exports: [SearchPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
