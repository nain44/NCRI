import { DragulaModule } from 'ng2-dragula';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInputRoutingModule } from './edit-input-routing.module';
import { EditInputComponent } from './edit-input/edit-input.component';


@NgModule({
  declarations: [EditInputComponent],
  imports: [
    CommonModule,
    EditInputRoutingModule,
    AccordionModule.forRoot(),
    NgSelect2Module,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FormsModule,
    DragulaModule.forRoot()
  ]
})
export class EditInputModule { }
