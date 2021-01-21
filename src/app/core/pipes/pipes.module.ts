import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanTransform } from './boolean.pipe'

@NgModule({
  declarations: [BooleanTransform],
  imports: [
    CommonModule
  ],
  exports: [BooleanTransform],
})
export class PipesModule { }
