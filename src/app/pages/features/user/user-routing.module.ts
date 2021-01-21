import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users-component/users.component';
import {CreateUserComponent} from './create-user-component/create-user.component';
import { ChangePasswordComponent } from './change-password-component/change-password.component';
import { FetchUserComponent } from './fetch-user/fetch-user.component';
import { ApproveUserComponent } from './approve-user/approve-user.component';
import { UserTeamsComponent } from './user-teams/user-teams.component';

const routes: Routes = [
  {path:'', component: UsersComponent},
  { path: 'add', component: CreateUserComponent },
  { path: 'user-teams', component: UserTeamsComponent },
  {path:'view/:id', component: FetchUserComponent},
  {path:'approve/:id', component: ApproveUserComponent},
  {path:'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
