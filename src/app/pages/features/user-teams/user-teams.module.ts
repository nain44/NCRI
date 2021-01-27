import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTeamsRoutingModule } from './user-teams-routing.module'; 
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgSelect2Module } from 'ng-select2';
import { DragulaModule } from 'ng2-dragula';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import {NewTeamComponent} from './new-team/new-team.component'
import { TeamService } from './services/user-teams.service';


@NgModule({
  declarations: [UserTeamsComponent,NewTeamComponent],
  imports: [
    CommonModule, 
    UserTeamsRoutingModule,
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
  ],
  providers:[TeamService,AccordionModule]
})
export class UserTeamsModule { }
