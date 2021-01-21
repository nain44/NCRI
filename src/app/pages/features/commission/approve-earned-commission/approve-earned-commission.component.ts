import { CommissionService } from './../service/commission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-approve-earned-commission',
  templateUrl: './approve-earned-commission.component.html',
  styleUrls: ['./approve-earned-commission.component.scss']
})
export class ApproveEarnedCommissionComponent implements OnInit {
  commissionID: string;
  loaderApprove = false;
  loader = false;
  commissionDetails: any;
  commissionType: string;
  dateRange: Date[];
  requestMsg = '';
  constructor(

    private service: CommissionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // fetching role id
    this.route.paramMap.subscribe(params => {
      this.commissionID = params.get('id');
    });
  }

  ngOnInit(): void {
    this.FetchCommissionCompensation();
  }
  FetchCommissionCompensation(): void {
    this.loader = true;
    const obj = {
      id: this.commissionID

    };
    this.service.FetchCommissionCompensation(obj).subscribe((res) => {
      this.loader = false;
      this.commissionDetails = res.data[0];
      this.commissionType = res.data[0].break_even_type;
      this.dateRange = [new Date(this.commissionDetails.start_date), new Date()];
      // debugger
      // this.commissionType === 'FS' ? this.selectTab(0) :
      //   this.commissionType === 'TS' ? this.selectTab(1) :
      //     this.commissionType === 'FT' ? this.selectTab(2) : this.selectTab(3);

      // debugger
    }, (error) => {
      this.loader = false;
      // debugger
    });
  }
  ApproveMultipleCommissionCompensation(): void {
    this.loaderApprove = true;
    const obj = {
      ids: [this.commissionID]
    };
    this.service.ApproveMultipleCommissionCompensation(obj).subscribe((res) => {
      this.loaderApprove = false;
      res.data?.approved ? this.router.navigate(['/commission']) : this.requestMsg = 'Request not approved';

      // debugger
    }, (error) => {
      this.loaderApprove = false;
      // debugger
    });
  }

}
