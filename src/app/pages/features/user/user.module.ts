import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './users-component/users.component';
import { CreateUserComponent } from './create-user-component/create-user.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ChangePasswordComponent } from './change-password-component/change-password.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FetchUserComponent } from './fetch-user/fetch-user.component';
import { ApproveUserComponent } from './approve-user/approve-user.component';
import { NgSelect2Module } from 'ng-select2';
import { DragulaModule } from 'ng2-dragula';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { NewTeamComponent } from './new-team/new-team.component'; 
import { SortableModule } from 'ngx-bootstrap/sortable';

@NgModule({
  declarations: [UsersComponent, CreateUserComponent, ChangePasswordComponent, FetchUserComponent, ApproveUserComponent, UserTeamsComponent, NewTeamComponent,],
  imports: [
    CommonModule, 
    UserRoutingModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    NgSelect2Module,
    DragulaModule.forRoot(),
    BsDropdownModule.forRoot(),
    SortableModule.forRoot(),
  ],
  providers: [UserService]
})
export class UserModule { }
