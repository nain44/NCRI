import { NgSelect2Module } from 'ng-select2';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AFMUploadFileRoutingModule } from './afmupload-file-routing.module';
import { AfmuploadFileComponent } from './afmupload-file/afmupload-file.component';
import { DirectivesModule } from '../../../../core';

@NgModule({
  declarations: [AfmuploadFileComponent],
  imports: [
    CommonModule,
    AFMUploadFileRoutingModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgSelect2Module,
    DirectivesModule
  ]
})
export class AFMUploadFileModule { }
