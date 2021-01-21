import { ApproveEarnedCommissionComponent } from './approve-earned-commission/approve-earned-commission.component';
import { MyCommissionComponent } from './my-commission/my-commission.component';
import { ApproveCommissionDashboardComponent } from './approve-commission-dashboard/approve-commission-dashboard.component';
import { ApproveCommissionComponent } from './approve-commission/approve-commission.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignMultiTargetComponent } from './assign-multi-target/assign-multi-target.component';
import { AssignTargetComponent } from './assign-target/assign-target.component';
import { CommissionComponent } from './commission-component/commission.component';
import { CommissionDetailComponent } from './commission-detail-component/commission-detail.component';
import { EditCommissionComponent } from './edit-commission/edit-commission.component';
import { SetTargetComponent } from './set-target/set-target.component';
import { TargetListViewComponent } from './target-list-view/target-list-view.component';
import { TargetMapViewComponent } from './target-map-view/target-map-view.component';
import { CompanyTargetComponent } from './company-target/company-target.component';
import { CommissionDashboardComponent } from './commission-dashboard/commission-dashboard.component';
import { CreateCommissionComponent } from './create-commission/create-commission.component';
import { UpdateCommissionComponent } from './update-commission/update-commission.component';
import { UserTargetComponent } from './user-target/user-target.component';

const routes: Routes = [
  // {path:'', component: CommissionComponent},
  {path:'', component: CommissionDashboardComponent},
  {path:'create/:id', component: CreateCommissionComponent},
  {path:'update/:id', component: UpdateCommissionComponent},
  {path:'user-target', component: UserTargetComponent},
  {path:'set', component: SetTargetComponent},
  {path:'assign', component: AssignTargetComponent},
  {path:'assign-multi', component: AssignMultiTargetComponent},
  {path:'assign-target', component: CompanyTargetComponent},
  {path:'detail', component: CommissionDetailComponent},
  {path:'edit-commission', component: EditCommissionComponent},
  {path:'map', component: TargetMapViewComponent},
  {path:'list', component: TargetListViewComponent},
  {path:'approve/:id', component: ApproveCommissionComponent},
  {path:'approve-dashboard', component: ApproveCommissionDashboardComponent},
  {path:'my-commission', component: MyCommissionComponent},
  {path:'approve-commission/:id', component: ApproveEarnedCommissionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRoutingModule { }
