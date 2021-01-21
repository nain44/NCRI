import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImporterDashboardRoutingModule } from './importer-dashboard-routing.module';
import { ImporterDashboardComponent } from './importer-dashboard/importer-dashboard.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [ImporterDashboardComponent],
  imports: [
    CommonModule,
    ImporterDashboardRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    NgSelect2Module,
  ]
})
export class ImporterDashboardModule { }
