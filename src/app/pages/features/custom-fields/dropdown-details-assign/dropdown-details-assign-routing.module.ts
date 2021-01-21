import { DropdownDetailsAssignComponent } from './dropdown-details-assign/dropdown-details-assign.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DropdownDetailsAssignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DropdownDetailsAssignRoutingModule { }
