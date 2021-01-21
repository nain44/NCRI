import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditAccountImporterRoutingModule } from './edit-account-importer-routing.module';
import { EditAccountImporterComponent } from './edit-account-importer/edit-account-importer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgSelect2Module } from 'ng-select2';
import { DirectivesModule } from 'src/app/core';


@NgModule({
  declarations: [EditAccountImporterComponent],
  imports: [
    CommonModule,
    EditAccountImporterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxMaterialTimepickerModule,
    NgSelect2Module,
    DirectivesModule
  ]
})
export class EditAccountImporterModule { }
