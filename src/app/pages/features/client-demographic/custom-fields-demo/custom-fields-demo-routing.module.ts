import { CustomFieldsDemoComponent } from './custom-fields-demo/custom-fields-demo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CustomFieldsDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomFieldsDemoRoutingModule { }
