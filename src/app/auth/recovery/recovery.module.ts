import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { ForgotPasswordComponent } from './forgot-password-component/forgot-password.component';
import { ResetPasswordComponent } from './reset-password-component/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotUserComponent } from './forgot-user-component/forgot-user.component';


@NgModule({
  declarations: [ForgotPasswordComponent, ResetPasswordComponent, ForgotUserComponent],
  imports: [
    CommonModule,
    RecoveryRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecoveryModule { }
