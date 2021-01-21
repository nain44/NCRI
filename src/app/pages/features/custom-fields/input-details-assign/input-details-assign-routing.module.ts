import { InputDetailsAssignComponent } from './input-details-assign/input-details-assign.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InputDetailsAssignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputDetailsAssignRoutingModule { }
