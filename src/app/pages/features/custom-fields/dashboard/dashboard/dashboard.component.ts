import { GlobalService } from './../../../../../core/services/global.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { StoreService } from './../../service/store.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Options } from 'select2';

@Component({
  selector: 'ncri-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  loader = false;
  gridLoader = false;
  pageConfig = {
    size: 10,
    page: 1,
    search_text: ''
  };
  customFieldList = [];
  @ViewChild('searchInput') searchInput: ElementRef; 
  @ViewChild('fileAdded') fileAdded: TemplateRef<any>;
  @ViewChild('importList') importList: TemplateRef<any>;
  paginationConfig = {
    count: 0,
    num_pages: 0
  };
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete '
  };
  configs = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };
  responseText: string;
  selectedField: any;

  public options: Options;
  currentDate = new Date();
  constructor(
    private modalService: BsModalService,
    public router: Router,
    public global: GlobalService,
    public store: StoreService,
  ) { 

    this.options = {
      multiple: false,
      minimumResultsForSearch: -1,
      theme: 'custom-select'
    };
  }

  ngOnInit(): void {
    this.CustomFieldList();
    this.clearForm();
  }
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          // console.log(this.searchInput.nativeElement.value)
          this.pageConfig.page = 1;
          // this.pageConfig.search_text = this.searchInput.nativeElement.value;
          this.CustomFieldList();
        })
      )
      .subscribe();
  }
  openDeleteUser(deleteUser: TemplateRef<any>, data): void {
    this.selectedField = data;
    this.modalRef = this.modalService.show(deleteUser, this.config);
    // this.modalRef.content.userActivate = 'Close';

  }
  
  
  openfileAdded(){
    this.modalRef = this.modalService.show(this.fileAdded, this.config);
  }
  openimportList(){
    this.modalRef = this.modalService.show(this.importList, this.config);
  }

  DeleteCustomField(): void {
    this.loader = true;
    this.responseText = '';
    const obj = {
      id: this.selectedField.id
    };
    this.store.DeleteCustomField(obj).subscribe((res) => {
      if (res.status === 'success') {
        this.CustomFieldList();
        this.modalRef.hide();
      } else {
        this.responseText = res.code;
      }


      this.loader = false;
    }, (error) => {
      this.loader = false;
      this.responseText = 'Sorry something went wrong, Try again.';
    });
  }

  CustomFieldList(): void {
    this.gridLoader = true;
    this.store.CustomFieldList(this.pageConfig).subscribe((res) => {
      this.customFieldList = res.data.qs;
      this.paginationConfig.count = res.data.count;
      this.gridLoader = false;
    }, (error) => {
      this.gridLoader = false;

    });
  }
  changePageSize(): void {
    // this.pageConfig.size = parseInt(this.selectedPageSize);
    this.pageConfig.page = 1;
    this.CustomFieldList();
  }
  pageChanged(event: any): void {
    // debugger
    this.pageConfig.page = event.page;
    this.CustomFieldList();

  }
  clearForm() {
    this.store.initCustomFieldForm();
    this.store.dropdownList = [];

  }

}
