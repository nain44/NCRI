import { DirectivesModule, PipesModule } from '../../../../core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDetailsRoutingModule } from './client-details-routing.module';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';




@NgModule({
  declarations: [ClientDetailsComponent],
  imports: [
    CommonModule,
    ClientDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    PipesModule,
    DirectivesModule
  ]
})
export class ClientDetailsModule { }
