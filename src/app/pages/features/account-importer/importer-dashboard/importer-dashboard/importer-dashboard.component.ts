import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/core';
import { AccountImportService } from '../../services';
import { AccountImporterStore } from '../../store';

@Component({
  selector: 'ncri-importer-dashboard',
  templateUrl: './importer-dashboard.component.html',
  styleUrls: ['./importer-dashboard.component.scss']
})
export class ImporterDashboardComponent implements OnInit {
  uploadedDate = new Date();
  importerList:any = [];
  pageConfig = {
    size: 10,
    page: 1,
    search_text: ''
  };
  paginationConfig = {
    count: 0,
    num_pages: 0
  };
  @ViewChild('searchInput') searchInput: ElementRef; 
  modalRef: BsModalRef;
  @ViewChild('rollbackConfirmation') rollbackModal: TemplateRef<any>;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'add-comment add-comment--delete '
  };
  loader: boolean = false;
  statusMapping = {
    'R':'RUNNING',
    'U':'UPLOADED',
    'D':'DECLINED',
    'E':'ERROR',
    'O':'ROLLBACK'
  }
  // pusherEvents: any[] = [];
  selectedAccount: any;
  rollbackLoader: boolean = false;
  responseText: string = "";
  rollbackList: any[] = [];
  importingList: any[] = [];
  teaserData: any = {
    uploaded_percentage:0,
    status:""
  };
  constructor(
    private service: AccountImportService,
    private modalService: BsModalService,
    public router: Router,
    public global: GlobalService,
    public store: AccountImporterStore
  ) { }

  ngOnInit(): void {
    this.getImportList();
  }

  //binding events with respect to uuid
  bindEvents(list:any){
    this.rollbackList = [];
    this.importingList = [];
    list.filter(it => it.status === 'R').map(it => {
      let event = this.store.channel.bind(it.id, (data) => {
        // alert(JSON.stringify(data));
        if(event.id === this.store.currentFileID){
          this.teaserData.uploaded_percentage = data.uploaded_percentage;
          this.teaserData.status = data.status;
          data.uploaded_percentage >= 100? this.store.IsNew = false : "";
        }
        let index = this.importerList.findIndex(it => it.id === event.id);
        if(index >= 0){
          this.importerList[index].uploaded_percentage = data.uploaded_percentage;
          
        }
        this.importerList[index].status = data.status;
      });
      event.id = it.id;
      this.importingList.push(event);
    })

    // list.filter(it => it.status === 'O').map(it => {
    //   let event = this.store.channel.bind(it.id, (data) => {
    //     // alert(JSON.stringify(data));
    //     let index = this.importerList.findIndex(it => it.id === event.id);
    //     if(index >= 0){
    //       this.importerList[index].uploaded_percentage = data.uploaded_percentage;
    //       this.importerList[index].status = data.status;
    //     }
    //   });
    //   this.rollbackList.push(event);
    // })
    
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.pageConfig.page = 1;
          this.getImportList();
        })
      )
      .subscribe();
  }

  changePageSize(): void {
    this.pageConfig.page = 1;
    this.getImportList();
  }

  pageChanged(event: any): void {
    this.pageConfig.page = event.page;
    this.getImportList();
  }

  getImportList(){
    this.loader = true;
    this.service.getImportService(this.pageConfig).subscribe((res) =>{
      this.loader = false;
      if(res.status === "success"){
        this.importerList = res.data.qs;
        this.paginationConfig.count = res.data.count;

        //binding events
        this.bindEvents(this.importerList);
        // this.importerList.map(it => it.status = "R")
      }
      
    },(error) =>{
      this.loader = false;
    })
  }

  //rollback implementation
  openRollbackConfirmationModal(obj:any){
    this.modalRef = this.modalService.show(this.rollbackModal, this.config);
    this.selectedAccount = obj;
  }

  //rollback api call
  rollbackImporter(){
    this.rollbackLoader = true;
    let obj = {
      id: this.selectedAccount.id
    }
    this.service.rollbackImporter(obj).subscribe((res) =>{
      this.rollbackLoader = false;
      if(res.status === "success"){
        this.router.navigate(['/account-importer/rollback/'+this.selectedAccount.id]);
        this.modalRef.hide();
      }else{
        if (res.errors) {
          const list = [];
          for (var key in res.errors) {
            list.push(res.errors[key].toString());
          }
          this.responseText = list.toString();
        } else {
          this.responseText = res.message;
        }
      }
    },(error) =>{
      this.rollbackLoader = false;
    })
  }

}
