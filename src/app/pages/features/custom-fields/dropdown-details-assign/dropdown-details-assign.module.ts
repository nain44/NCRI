import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgSelect2Module } from 'ng-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDetailsAssignRoutingModule } from './dropdown-details-assign-routing.module';
import { DropdownDetailsAssignComponent } from './dropdown-details-assign/dropdown-details-assign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { PipeModule } from '../pipes';

@NgModule({
  declarations: [DropdownDetailsAssignComponent],
  imports: [
    PipeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownDetailsAssignRoutingModule,
    AccordionModule.forRoot(),
    NgSelect2Module,
    ModalModule.forRoot(),
    DragulaModule.forRoot()
  ]
})
export class DropdownDetailsAssignModule { }
