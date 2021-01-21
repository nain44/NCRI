
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles-component/roles.component';
import { CreateRoleComponent } from './create-role-component/create-role.component';
import { UserRolesComponent } from './user-roles-component/user-roles.component';
import { SystemRolesComponent } from './system-roles-component/system-roles.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { RoleService } from './services'
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user/services/user.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { UpdateRoleComponent } from './update-role-component/update-role.component';
import { CopyRoleComponent } from './copy-role-component/copy-role.component'
// import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [RolesComponent, CreateRoleComponent, UserRolesComponent, SystemRolesComponent, UpdateRoleComponent, CopyRoleComponent],
  imports: [
    
    AccordionModule.forRoot(),
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    RolesRoutingModule,
    NgxBootstrapMultiselectModule,
    ModalModule.forRoot(),
    // NgSelect2Module
  ],
  providers:[RoleService,UserService]
})
export class RolesModule { }
