import { ActivatedRoute, Router } from '@angular/router';
import { CommissionService } from './../service/commission.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PrivilegesStore } from 'src/app/core';

@Component({
  selector: 'ncri-approve-commission',
  templateUrl: './approve-commission.component.html',
  styleUrls: ['./approve-commission.component.scss']
})
export class ApproveCommissionComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild('historyModal') historyModal: TemplateRef<any>;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-xl'
  };
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  commissionID: string;
  loader = false;
  loaderCancel = false;
  loaderApprove = false;
  commissionDetails: any;
  commissionType: any;
  commissionHistory = [];
  requestMsg = '';
  comment = '';
  historyPage = 1;
  loadMoreHistory = true;

  constructor(
    private modalService: BsModalService,
    private service: CommissionService,
    private route: ActivatedRoute,
    private router: Router,
    public privileges: PrivilegesStore
  ) {
    // fetching role id
    this.route.paramMap.subscribe(params => {
      this.commissionID = params.get('id');
    });
  }

  ngOnInit(): void {
    this.FetchCommissionCompensation();
  }

  FetchCommissionCompensationHistory(modal): void {
    modal === 'more' ? modal = 'more' : this.openModal(modal);
    this.loader = true;
    const obj = {
      size: 2,
      page: this.historyPage,
      commission_compensation_id: this.commissionID
    };
    this.service.FetchCommissionCompensationHistory(obj).subscribe((res) => {
      this.loader = false;
      debugger
      this.commissionHistory = [...this.commissionHistory, ...res.data.qs];
      res.data.num_pages === this.historyPage ? this.loadMoreHistory = false : this.historyPage++;
    }, (error) => {
      this.loader = false;
      // debugger
    });
  }
  PendingCommissionCompensationWithSuggestion(): void {
    this.loaderCancel = true;
    const obj = {
      id: this.commissionID,
      last_cancelled_suggestion: this.comment
    };
    this.service.PendingCommissionCompensationWithSuggestion(obj).subscribe((res) => {
      debugger
      this.loaderCancel = false;
      res.data?.operation_done ? this.router.navigate(['/commission']) : this.requestMsg = 'Request not approved';

      // debugger
    }, (error) => {
      this.loaderCancel = false;
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
  FetchCommissionCompensation(): void {
    this.loader = true;
    const obj = {
      id: this.commissionID
    };
    this.service.FetchCommissionCompensation(obj).subscribe((res) => {
      this.loader = false;
      this.commissionDetails = res.data[0];
      this.commissionType = res.data[0].break_even_type;
      // debugger
      this.commissionType === 'FS' ? this.selectTab(0) :
        this.commissionType === 'TS' ? this.selectTab(1) :
          this.commissionType === 'FT' ? this.selectTab(2) : this.selectTab(3);

      // debugger
    }, (error) => {
      this.loader = false;
      // debugger
    });
  }

  selectTab(tabId: number): void {
    this.staticTabs.tabs[tabId].active = true;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(this.historyModal, this.config);
  }
  closeModal(): void {
    this.modalRef.hide();
    this.commissionHistory = [];
    this.historyPage = 1;
  }

}
