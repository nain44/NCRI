import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditSystemFieldRoutingModule } from './edit-system-field-routing.module';
import { EditSystemFieldComponent } from './edit-system-field/edit-system-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgSelect2Module } from 'ng-select2';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from 'src/app/core';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
  declarations: [EditSystemFieldComponent],
  imports: [
    CommonModule,
    EditSystemFieldRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot(),
    NgSelect2Module,
    ModalModule.forRoot(),
    DirectivesModule,
    DragulaModule.forRoot()
  ]
})
export class EditSystemFieldModule { }
