import { GlobalService } from 'src/app/core';
import { CommissionService } from './../service/commission.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-approve-commission-dashboard',
  templateUrl: './approve-commission-dashboard.component.html',
  styleUrls: ['./approve-commission-dashboard.component.scss']
})
export class ApproveCommissionDashboardComponent implements OnInit {
  pageLoader = false;
  usersHierarchy = [];
  branch: string;
  dateRange: any;
  constructor(
    private service: CommissionService,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.CommissionCompensationListPerReportingUser();
  }

  toggleView(DOM: HTMLElement): void {
    debugger
    if (DOM.classList.contains('inactive')) {
      DOM.classList.remove('inactive');
    } else {
      DOM.classList.add('inactive');
    }
  }



  CommissionCompensationListPerReportingUser(): void { 
    this.pageLoader = true;
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() < 11 ? (new Date().getMonth() + 2) : 1);
    let obj = {
      // "start_date": new Date().getFullYear() +'-'+ (new Date().getMonth() + 1) +'-'+ new Date().getDate(),
      // "end_date": new Date().getFullYear() +'-'+ (
      //   new Date().getMonth() < 11 ? (new Date().getMonth() + 2) : 1
      //   ) +'-'+ new Date().getDate()
      start_date: this.global.dateFormat(this.dateRange ? this.dateRange[0] : new Date()),
      end_date: this.global.dateFormat(endDate),
    };
    debugger
    this.service.CommissionCompensationListPerReportingUser(obj).subscribe((res) => {
      debugger
      this.pageLoader = false;
      this.branch = res.data.branch_location__addresses[0];
      this.usersHierarchy = res.data.users_hierarchy;
    }, (error) => {
      this.pageLoader = false;
    });
  }

}
