import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AFMFileInfoRoutingModule } from './afmfile-info-routing.module';
import { AfmfileInfoComponent } from './afmfile-info/afmfile-info.component';


@NgModule({
  declarations: [AfmfileInfoComponent],
  imports: [
    CommonModule,
    AFMFileInfoRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
    TagInputModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AFMFileInfoModule { }
