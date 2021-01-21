import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalSettingsComponent } from './portal-settings/portal-settings.component'
const routes: Routes = [

  { path: '', component: PortalSettingsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalSettingsRoutingModule { }
