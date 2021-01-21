import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportStatusComponent } from './import-status/import-status.component';

const routes: Routes = [
  {
    path: '',
    component: ImportStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportStatusRoutingModule { }
