import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSystemFieldComponent } from './edit-system-field/edit-system-field.component';

const routes: Routes = [
  {
    path: '',
    component: EditSystemFieldComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSystemFieldRoutingModule { }
