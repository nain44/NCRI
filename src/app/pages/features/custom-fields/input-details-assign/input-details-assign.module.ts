
import { PipeModule } from '../pipes';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputDetailsAssignRoutingModule } from './input-details-assign-routing.module';
import { InputDetailsAssignComponent } from './input-details-assign/input-details-assign.component';


@NgModule({
  declarations: [InputDetailsAssignComponent],
  imports: [
    CommonModule,
    InputDetailsAssignRoutingModule,
    AccordionModule.forRoot(),
    NgSelect2Module,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    PipeModule,
    FormsModule,
  ]
})
export class InputDetailsAssignModule { }
