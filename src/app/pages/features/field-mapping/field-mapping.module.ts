import { AfmService } from './services/afm.service';
import { TempService } from './services/temp.service';
import { AfmStoreTempService } from './services/afm-store-temp.service';
import { AfmStoreService } from './services/afm-store.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldMappingRoutingModule } from './field-mapping-routing.module'; 
import { FieldMappingComponent } from './field-mapping/field-mapping.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [FieldMappingComponent],
  imports: [
    CommonModule,
    FieldMappingRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
  ],
  providers: [AfmStoreService, AfmStoreTempService, AfmService,TempService]
})
export class FieldMappingModule { }
