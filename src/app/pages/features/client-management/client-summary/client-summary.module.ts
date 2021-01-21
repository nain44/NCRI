import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSummaryRoutingModule } from './client-summary-routing.module';
import { ClientSummaryComponent } from './client-summary/client-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TagInputModule } from 'ngx-chips';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [ClientSummaryComponent],
  imports: [
    CommonModule,
    ClientSummaryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TagInputModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
  ]
})
export class ClientSummaryModule { }
