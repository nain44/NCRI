import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTeamsComponent } from './user-teams/user-teams.component';

const routes: Routes = [{ path: '', component: UserTeamsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTeamsRoutingModule { }
