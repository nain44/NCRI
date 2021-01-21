import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDetailsRoutingModule } from './client-details-routing.module';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [ClientDetailsComponent],
  imports: [
    CommonModule,
    ClientDetailsRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
  ]
})
export class ClientDetailsModule { }
