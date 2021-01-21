import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups-component/groups.component';
import { CreateGroupComponent } from './create-group-component/create-group.component';


@NgModule({
  declarations: [GroupsComponent, CreateGroupComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
