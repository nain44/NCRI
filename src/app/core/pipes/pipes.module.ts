import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanTransform } from './boolean.pipe'
import {SearchUserPipe} from './searchUser.pipe'

@NgModule({
  declarations: [BooleanTransform,SearchUserPipe],
  imports: [
    CommonModule
  ],
  exports: [BooleanTransform,SearchUserPipe],
})
export class PipesModule { }
