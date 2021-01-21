import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDetailsRoutingModule } from './dropdown-details-routing.module';
import { DropdownDetailsComponent } from './dropdown-details/dropdown-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../../core';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
  declarations: [DropdownDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownDetailsRoutingModule,
    AccordionModule.forRoot(),
    NgSelect2Module,
    DirectivesModule,
    ModalModule.forRoot(),
    DragulaModule.forRoot()
  ]
})
export class DropdownDetailsModule { }
