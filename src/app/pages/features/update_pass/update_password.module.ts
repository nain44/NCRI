import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdatePasswordRoutingModule } from './update_password-routing.module';
import { UpdatePasswordComponent } from './update_password/update_password.component';
import { UserService } from '../user/services/user.service';

@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    CommonModule,
    UpdatePasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UserService]
})
export class UpdatePasswordModule { }
