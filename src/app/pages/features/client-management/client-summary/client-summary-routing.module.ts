import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientSummaryComponent } from './client-summary/client-summary.component';

const routes: Routes = [
  { path: '', component: ClientSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSummaryRoutingModule { }
