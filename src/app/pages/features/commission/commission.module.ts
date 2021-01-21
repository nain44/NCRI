import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionRoutingModule } from './commission-routing.module';
import { CommissionComponent } from './commission-component/commission.component';
import { CommissionDetailComponent } from './commission-detail-component/commission-detail.component';
import { CommissionService } from './service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user/services/user.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SetTargetComponent } from './set-target/set-target.component';
import { AssignTargetComponent } from './assign-target/assign-target.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AssignMultiTargetComponent } from './assign-multi-target/assign-multi-target.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EditCommissionComponent } from './edit-commission/edit-commission.component';
import { TargetMapViewComponent } from './target-map-view/target-map-view.component';
import { TargetListViewComponent } from './target-list-view/target-list-view.component';
import { CompanyTargetComponent } from './company-target/company-target.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommissionDashboardComponent } from './commission-dashboard/commission-dashboard.component';
import { CreateCommissionComponent } from './create-commission/create-commission.component';
import { ApproveCommissionComponent } from './approve-commission/approve-commission.component';
import { TagInputModule } from 'ngx-chips';
import { ApproveCommissionDashboardComponent } from './approve-commission-dashboard/approve-commission-dashboard.component';
import { ApproveEarnedCommissionComponent } from './approve-earned-commission/approve-earned-commission.component';
import { MyCommissionComponent } from './my-commission/my-commission.component';

import { UpdateCommissionComponent } from './update-commission/update-commission.component';
import { UserTargetComponent } from './user-target/user-target.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [CommissionComponent,


    UpdateCommissionComponent,
    CommissionDetailComponent, SetTargetComponent, AssignTargetComponent,
    AssignMultiTargetComponent, EditCommissionComponent, TargetMapViewComponent,
    TargetListViewComponent, CompanyTargetComponent, CommissionDashboardComponent,
    CreateCommissionComponent, ApproveCommissionComponent, ApproveCommissionDashboardComponent,
    ApproveEarnedCommissionComponent, MyCommissionComponent, UserTargetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    CommissionRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    TagInputModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [CommissionService, UserService]
})
export class CommissionModule { }
