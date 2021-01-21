import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportStatusRoutingModule } from './import-status-routing.module';
import { ImportStatusComponent } from './import-status/import-status.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ImportStatusComponent],
  imports: [
    CommonModule,
    ImportStatusRoutingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class ImportStatusModule { }
