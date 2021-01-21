import { AfmEditFieldMappingComponent } from './afm-edit-field-mapping/afm-edit-field-mapping.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AfmEditFieldMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AFMEditFieldMappingRoutingModule { }
