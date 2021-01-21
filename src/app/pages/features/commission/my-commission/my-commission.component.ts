import { ActivatedRoute } from '@angular/router';
import { CommissionService } from './../service/commission.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-my-commission',
  templateUrl: './my-commission.component.html',
  styleUrls: ['./my-commission.component.scss']
})
export class MyCommissionComponent implements OnInit {
  loader = false;
  commissionDetails: any;
  commissionType: string;
  dateRange: Date[];
  constructor(

    private service: CommissionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.MyCommissionCompensationList();
  }
  MyCommissionCompensationList(): void {
    this.loader = true;
    this.service.MyCommissionCompensationList().subscribe((res) => {
      this.loader = false;
      this.commissionDetails = res.data[0];
      this.commissionType = res.data[0].break_even_type;
      this.dateRange = [new Date(this.commissionDetails.start_date ), new Date()];
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
}
