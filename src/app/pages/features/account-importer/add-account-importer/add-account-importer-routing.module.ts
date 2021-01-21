import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountImporterComponent } from './add-account-importer/add-account-importer.component';

const routes: Routes = [
  {
    path: '',
    component: AddAccountImporterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAccountImporterRoutingModule { }
