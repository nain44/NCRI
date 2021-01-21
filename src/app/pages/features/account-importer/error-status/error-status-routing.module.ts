import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorStatusComponent } from './error-status/error-status.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorStatusRoutingModule { }
