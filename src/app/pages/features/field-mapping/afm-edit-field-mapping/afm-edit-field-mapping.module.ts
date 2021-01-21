import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AFMEditFieldMappingRoutingModule } from './afm-edit-field-mapping-routing.module';
import { AfmEditFieldMappingComponent } from './afm-edit-field-mapping/afm-edit-field-mapping.component';


@NgModule({
  declarations: [AfmEditFieldMappingComponent],
  imports: [
    CommonModule,
    AFMEditFieldMappingRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AFMEditFieldMappingModule { }
