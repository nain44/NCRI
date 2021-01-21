import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImporterDashboardComponent } from './importer-dashboard/importer-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ImporterDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImporterDashboardRoutingModule { }
