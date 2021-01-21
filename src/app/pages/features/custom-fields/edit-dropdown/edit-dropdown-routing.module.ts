import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditDropdownComponent } from './edit-dropdown/edit-dropdown.component';

const routes: Routes = [
  {
    path: '',
    component: EditDropdownComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDropdownRoutingModule { }
