import { NgSelect2Module } from 'ng-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFieldsRoutingModule } from './custom-fields-routing.module';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [CustomFieldsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFieldsRoutingModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
  ]
})
export class CustomFieldsModule { }
