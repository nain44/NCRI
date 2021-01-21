import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ClientDashboardService } from './../services/client-dashboard.service';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core'; 
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
declare var $;
@Component({
  selector: 'ncri-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit { 
  modalRef: BsModalRef;
  @ViewChild('searchInput') searchInput: ElementRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };


  clientList = []; 
  selectedClient: any;
  loader: boolean = false;
  // totalItems = 5;
  paginationConfig:any  = {
    size: 5,
    page: 1,
    search_text: '',
    totalRecords:0
  }
  deleteLoader: boolean = false;
  isFirst: boolean = false;
  isData: boolean = false;
  constructor(
    private service: ClientDashboardService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.clientDemographicsList();
  }
  openModalDelete(template: TemplateRef<any>, client): void {
    this.selectedClient = client;
    this.modalRef = this.modalService.show(template,this.config);
  }
  deleteClientDemographic(uuid): void {
    this.deleteLoader = true;
    const obj = {
      id: uuid
    };
    this.service.deleteClientDemographic(obj).subscribe((data) => {
      if (data.status) {
        this.clientDemographicsList();
      }
      this.modalRef.hide();
      this.deleteLoader = false;
    }, (error) => {
      this.deleteLoader = false;
      console.log(error);
    });
  }
  clientDemographicsList(): void {
    this.loader = true;
    // const obj = {
    //   size: parseInt(this.selectedPageSize),
    //   page: 1,
    //   search_text: ''
    // };
    this.paginationConfig.size = parseInt(this.paginationConfig.size);
    this.service.clientDemographicsList(this.paginationConfig).subscribe((data) => {
      if (data.status === "success") {
        if(this.isData === false && data.data.qs.length > 0){
          this.isData = true;
        }else if(this.isData === false && data.data.qs.length === 0){
          this.isFirst = true;
        }
        this.clientList = data.data.qs;
        this.paginationConfig.totalRecords = data.data.count;
      }
      this.loader = false;
    }, (error) => {
      console.log(error);
      this.loader = false
    });

  }
  addClient() {
    this.router.navigate(['/add-client']);
  }
  select2Init(){
    $(".selectDropdown").select2({
      minimumResultsForSearch: -1
  });  
  }

  ngAfterViewInit(){
    // this.select2Init();
    fromEvent(this.searchInput.nativeElement,'keyup')
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap((text) => {
                  // console.log(this.searchInput.nativeElement.value)
                  debugger
                  this.paginationConfig.page = 1;
                  this.paginationConfig.search_text = this.searchInput.nativeElement.value;
                  this.clientDemographicsList();
                })
            )
            .subscribe();
  }

  resetPageSize(){
      this.clientDemographicsList();
  }

  pageChanged(event){
    this.paginationConfig.page = event.page;
    this.clientDemographicsList();
  }

  downloadClientDemographicTransactionsList(type): void {
    
    const obj = {
      output_format: type,
    };
    this.service.downloadClientList(obj).subscribe((data) => {
    }, (error) => {
      console.log(error);
      var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(error.error.text);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'clients.csv';
    hiddenElement.click();
    });

  }
}
