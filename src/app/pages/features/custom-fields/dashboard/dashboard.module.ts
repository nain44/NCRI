import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgSelect2Module } from 'ng-select2';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    NgxMaterialTimepickerModule,
    NgSelect2Module,
  ]
})
export class DashboardModule { }
