import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFieldsDemoRoutingModule } from './custom-fields-demo-routing.module';
import { CustomFieldsDemoComponent } from './custom-fields-demo/custom-fields-demo.component';


@NgModule({
  declarations: [CustomFieldsDemoComponent],
  imports: [
    CommonModule,
    CustomFieldsDemoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
  ]
})
export class CustomFieldsDemoModule { }
