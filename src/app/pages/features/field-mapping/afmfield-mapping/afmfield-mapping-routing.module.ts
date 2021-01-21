import { AfmfieldMappingComponent } from './afmfield-mapping/afmfield-mapping.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AfmfieldMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AFMFieldMappingRoutingModule { }
