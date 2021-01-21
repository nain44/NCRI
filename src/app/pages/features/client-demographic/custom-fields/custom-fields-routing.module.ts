import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';

const routes: Routes = [

  { path: '', component: CustomFieldsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomFieldsRoutingModule { }
