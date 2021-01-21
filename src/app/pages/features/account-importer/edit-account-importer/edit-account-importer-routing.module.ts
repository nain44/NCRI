import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAccountImporterComponent } from './edit-account-importer/edit-account-importer.component';

const routes: Routes = [
  {
    path: '',
    component: EditAccountImporterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAccountImporterRoutingModule { }
