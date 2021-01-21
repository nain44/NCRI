import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountImporterRoutingModule } from './account-importer-routing.module';
import { AccountImporterComponent } from './account-importer/account-importer.component';


@NgModule({
  declarations: [AccountImporterComponent],
  imports: [
    CommonModule,
    AccountImporterRoutingModule
  ]
})
export class AccountImporterModule { }
