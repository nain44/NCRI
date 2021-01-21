import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeSelectionRoutingModule } from './type-selection-routing.module';
import { TypeSelectionComponent } from './type-selection/type-selection.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [TypeSelectionComponent],
  imports: [
    CommonModule,
    TypeSelectionRoutingModule,
    AccordionModule.forRoot()
  ]
})
export class TypeSelectionModule { }
