import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { APP_CONFIG, PrivilegesStore } from 'src/app/core';
import { UserService } from '../../user/services/user.service';
import { CommissionService } from '../service';

@Component({
  selector: 'ncri-commission-dashboard',
  templateUrl: './commission-dashboard.component.html',
  styleUrls: ['./commission-dashboard.component.scss']
})
export class CommissionDashboardComponent implements OnInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  checkAll: boolean = false;
  approveLoader: boolean = false;
  cancelLoader: boolean = false;
  modalRef: BsModalRef;
  downloadType: string = "csv"
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete '
  };
  @ViewChild('usersDownload') downloadModal: any;
  paginationConfig = {
    size: 5,
    page: 1,
    filter_by: "ALL",
    count: 0,
    search_text: ""
  }
  loader: boolean = false;
  commissionUserList: any = [];
  selectedPageSize: string = '5';
  selectedCommission:any = [];
  downloadLoader: boolean;
  constructor(
    private modalService: BsModalService,
    private service: UserService,
    private commissionService: CommissionService,
    private router: Router,
    public privileges: PrivilegesStore
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.loader = true;
    this.service.usersListCCM(this.paginationConfig).subscribe((res) => {
      //debugger
      this.loader = false;
      if (res.status === "success") {
        this.commissionUserList = res.data.qs;
        this.commissionUserList.map(it => {
          it.check = false;
        });
        
        this.paginationConfig.count = res.data.count;
        this.commissionUserList.map(it => it.cc_status === null ? it.cc_status = "z" : '')
        // this.userList = this.userList.filter(it => it.cc_status !== null)
        this.commissionUserList.sort((a, b) => b.cc_status ? b.cc_status.toLowerCase().localeCompare(a.cc_status.toLowerCase()) : "");
        // this.userList.sort((a,b) => (b.cc_status.toLowerCase() > a.cc_status.toLowerCase()) ? 1 : ((a.cc_status.toLowerCase() > b.cc_status.toLowerCase()) ? -1 : 0)); 

      }
    }, (error) => {
      this.loader = false;
      //debugger
    })
  }

  ngAfterViewInit(){
    fromEvent(this.searchInput.nativeElement,'keyup')
    .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          // console.log(this.searchInput.nativeElement.value)
          this.paginationConfig.page = 1;
          // this.pageConfig.search_text = this.searchInput.nativeElement.value;
          this.getUserList()
        })
    )
    .subscribe();
  }

  changePageSize(){
    this.paginationConfig.size = parseInt(this.selectedPageSize);
    this.paginationConfig.page = 1;
    this.getUserList();
  }

  pageChanged(event: any): void {
    //debugger
    this.paginationConfig.page = event.page;
    this.getUserList();
    
  }

  approveAllCommission(){
    let obj = {
      ids:this.commissionUserList.filter(it => it.check === true).map(it => it.cc_id)
    }
    this.approveLoader = true;
    this.commissionService.ApproveMultipleCommissionCompensation(obj).subscribe((res) =>{
      this.approveLoader = false;
      if(res.status === "success"){
        this.checkAll = false;
        this.getUserList();
      }
    },(error) =>{
      this.approveLoader = false;
    })
  }

  rejectAllCommission(){
    let obj = {
      ids:this.commissionUserList.filter(it => it.check === true).map(it => it.cc_id)
    }
    this.cancelLoader = true;
    this.commissionService.CancelMultipleCommissionCompensation(obj).subscribe((res) =>{
      this.cancelLoader = false;
      if(res.status === "success"){
        this.checkAll = false;
        this.getUserList();
      }
    },(error) =>{
      this.cancelLoader = false;
    })
  }

  selectAll(){
    if(this.checkAll === true){
      this.commissionUserList.map(it => {
        (!this.privileges.privilegeHash['ccm.views.ApproveMultipleCommissionCompensation']['c']
          && !this.privileges.privilegeHash['ccm.views.CancelMultipleCommissionCompensation']['c']) ?

          '' : (this.privileges.privilegeHash['ccm.views.ApproveMultipleCommissionCompensation']['c']
            || this.privileges.privilegeHash['ccm.views.CancelMultipleCommissionCompensation']['c']) ?
            (it.cc_status === 'P' && it.cc_id !== null)
              ? it.check = true : ''
            : ''
      });
    }else{
      this.commissionUserList.map(it => it.check = false);
    }
  }

  showbtn(){
    let check = this.commissionUserList.some(it => it.check === true)
    return check;
  }

  openDownloadModal(){
    this.modalRef = this.modalService.show(this.downloadModal, this.config);
  }

  downloadFile(type:any) {
    this.downloadType = type;
    this.downloadLoader = true;
    const obj = {
      output_format: this.downloadType,
    };
    this.service.downloadClientList(obj).subscribe((data) => {
      this.downloadLoader = false;
    }, (error) => {
      this.downloadLoader = false;
      console.log(error);
      var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(error.error.text);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'clients.csv';
    hiddenElement.click();
    });
  }

}
