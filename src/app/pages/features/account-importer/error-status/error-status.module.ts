import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorStatusRoutingModule } from './error-status-routing.module';
import { ErrorStatusComponent } from './error-status/error-status.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [ErrorStatusComponent],
  imports: [
    CommonModule,
    ErrorStatusRoutingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class ErrorStatusModule { }
