import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile-component/profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileService } from './service'
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';




@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ProfileRoutingModule,
    AccordionModule.forRoot(),
  ],
  providers:[ProfileService]
})
export class ProfileModule { }
