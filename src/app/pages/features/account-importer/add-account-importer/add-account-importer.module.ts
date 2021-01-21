import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAccountImporterRoutingModule } from './add-account-importer-routing.module';
import { AddAccountImporterComponent } from './add-account-importer/add-account-importer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgSelect2Module } from 'ng-select2';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DirectivesModule } from 'src/app/core';


@NgModule({
  declarations: [AddAccountImporterComponent],
  imports: [
    CommonModule,
    AddAccountImporterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxMaterialTimepickerModule,
    NgSelect2Module,
    DirectivesModule
  ]
})
export class AddAccountImporterModule { }
