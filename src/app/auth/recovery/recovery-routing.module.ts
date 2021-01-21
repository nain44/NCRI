import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password-component/forgot-password.component';
import { ResetPasswordComponent } from './reset-password-component/reset-password.component';
import { ForgotUserComponent } from './forgot-user-component/forgot-user.component';

const routes: Routes = [
  {path:'', redirectTo:'forgot'},
  {path:'forgot', component: ForgotPasswordComponent},
  {path:'forgot-user', component: ForgotUserComponent},
  {path:'reset/:uid/:token', component: ResetPasswordComponent},
  {path: '**', redirectTo: '/user'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryRoutingModule { }
