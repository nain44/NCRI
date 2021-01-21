import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDropdownRoutingModule } from './edit-dropdown-routing.module';
import { EditDropdownComponent } from './edit-dropdown/edit-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgSelect2Module } from 'ng-select2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DragulaModule } from 'ng2-dragula';
import { DirectivesModule } from '../../../../core';
import { PipeModule } from '../pipes';

@NgModule({
  declarations: [EditDropdownComponent],
  imports: [
    PipeModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot(),
    NgSelect2Module,
    ModalModule.forRoot(),
    DirectivesModule,
    DragulaModule.forRoot(),
    EditDropdownRoutingModule
  ]
})
export class EditDropdownModule { }
