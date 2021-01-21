import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AfmService } from './../../services/afm.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PrivilegesStore } from 'src/app/core';
import { AfmStoreService } from '../../services/afm-store.service';

@Component({
  selector: 'ncri-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };
  pageConfig = {
    size: 10,
    page: 1,
    search_text: ''
  }
  @ViewChild('searchInput') searchInput: ElementRef;
  fieldsData: any;
  totalRecords: number;
  selectedField: any;
  deleteClientLoader = false;
  loader: boolean = false;

  constructor(
    private modalService: BsModalService,
    public privileges: PrivilegesStore,
    private store: AfmStoreService,
    private service: AfmService) { }

  ngOnInit(): void {
    // clear store first
    this.deleteFile();
    this.store.initFieldMapping();
    // getting list
    this.FieldMappingList();
  }
  deleteFile(){
    this.store.fileName = "";
    this.store.fieldMappingForm.controls.file_url.setValue("");
    this.store.columnNames = [];
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          // console.log(this.searchInput.nativeElement.value)
          this.pageConfig.page = 1;
          this.pageConfig.search_text = this.searchInput.nativeElement.value;
          this.FieldMappingList();
        })
      )
      .subscribe();
  }

  pageChanged(event: any): void {
    // debugger
    this.pageConfig.page = event.page;
    this.FieldMappingList();

  }

  DeleteFieldMapping(): void {
    this.deleteClientLoader = true;
    const obj = {
      id: this.selectedField.id
    }
    this.service.DeleteFieldMapping(obj).subscribe((res) => {
      debugger
      if (res.status === 'success') {
        this.modalRef.hide();
        this.changePageSize();
      }
      this.deleteClientLoader = false;
    }, (error) => {
      this.deleteClientLoader = false;

    });
  }

  changePageSize(): void {
    this.pageConfig.page = 1;
    this.FieldMappingList();
  }

  FieldMappingList(): void {
    this.loader = true;
    this.service.FieldMappingList(this.pageConfig).subscribe((res) => {
     // debugger
      if (res.status === 'success') {
        this.fieldsData = res.data.qs;
        this.totalRecords = res.data.count;
        this.fieldsData.forEach(element => {
          element.product_list = JSON.parse(element.product_list);
        });
        this.loader = false;

      }else{
        this.loader = false;
      }
    }, (error) => {
      this.loader = false;
    });
  }

  openModalDelete(template: TemplateRef<any>, data: any): void {
    this.selectedField = data;
    this.modalRef = this.modalService.show(template, this.config);
  }

}
