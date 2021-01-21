import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsComponent } from './groups-component/groups.component';
import { CreateGroupComponent } from './create-group-component/create-group.component';

const routes: Routes = [
  {path:'', component: GroupsComponent},
  {path:'add', component: CreateGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
