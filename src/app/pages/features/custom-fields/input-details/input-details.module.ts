import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputDetailsRoutingModule } from './input-details-routing.module';
import { InputDetailsComponent } from './input-details/input-details.component';
import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InputDetailsComponent],
  imports: [
    CommonModule,
    InputDetailsRoutingModule,
    NgSelect2Module,
    ReactiveFormsModule,
    AccordionModule.forRoot()
  ]
})
export class InputDetailsModule { }
