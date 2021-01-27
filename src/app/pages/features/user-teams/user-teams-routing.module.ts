import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTeamComponent } from '../user-teams/new-team/new-team.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';

const routes: Routes = [{ path: '', component: UserTeamsComponent },
{ path: 'add', component: NewTeamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTeamsRoutingModule { }
