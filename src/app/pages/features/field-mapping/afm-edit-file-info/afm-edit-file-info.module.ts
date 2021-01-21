import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AFMEditFileInfoRoutingModule } from './afm-edit-file-info-routing.module';
import { AfmEditFileInfoComponent } from './afm-edit-file-info/afm-edit-file-info.component';


@NgModule({
  declarations: [AfmEditFileInfoComponent],
  imports: [
    CommonModule,
    AFMEditFileInfoRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
  ]
})
export class AFMEditFileInfoModule { }
