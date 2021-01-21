import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeLogoComponent } from './change-logo-component/change-logo.component';
import { IntegrationComponent } from './integration/integration.component';

const routes: Routes = [
  {path: '', redirectTo: 'change-logo'},
  {path: 'change-logo', component: ChangeLogoComponent},
  {path: 'integration', component: IntegrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
