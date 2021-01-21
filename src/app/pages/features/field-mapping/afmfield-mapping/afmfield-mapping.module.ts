import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AFMFieldMappingRoutingModule } from './afmfield-mapping-routing.module';
import { AfmfieldMappingComponent } from './afmfield-mapping/afmfield-mapping.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AfmfieldMappingComponent],
  imports: [
    CommonModule,
    FormsModule,
    AFMFieldMappingRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
  ]
})
export class AFMFieldMappingModule { }
