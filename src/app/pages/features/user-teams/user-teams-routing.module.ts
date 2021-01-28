import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTeamComponent } from '../user-teams/new-team/new-team.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
const routes: Routes = [
{ path: '', component: UserTeamsComponent },
{ path: 'add', component: NewTeamComponent },
{ path: 'edit', component: EditTeamComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTeamsRoutingModule { }
