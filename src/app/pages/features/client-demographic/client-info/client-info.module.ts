import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientInfoRoutingModule } from './client-info-routing.module';
import { ClientInfoComponent } from './client-info/client-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [ClientInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientInfoRoutingModule,
    AccordionModule.forRoot(),
  ]
})
export class ClientInfoModule { }
