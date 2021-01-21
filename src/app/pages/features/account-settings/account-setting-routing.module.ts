import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security-component/security.component';
import { EmailComponent } from './email-component/email.component';
import { AccountPreferenceComponent } from './account-preference-component/account-preference.component';

const routes: Routes = [
  {path: '', redirectTo:'security'},
  {path: 'security', component: SecurityComponent},
  {path: 'email', component: EmailComponent},
  {path: 'preference', component: AccountPreferenceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
