import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SystemFieldService } from '../../service';

@Component({
  selector: 'ncri-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  systemFieldsList: any = [];
  loader: boolean = false;
  @ViewChild('searchInput') searchInput: ElementRef;
  selectedPageSize: any = 10;
  paginationConfig = {
    count: 0,
    num_pages: 0
  }
  pageConfig: any = {
    size: 10,
    page: 1,
    search_text: ""
  }
  fieldTypeMap = {
    TSL: 'Text Single Line',
    TML: 'Text Multiple Line',
    N: 'Numeric',
    RB: 'Radio Button',
    C: 'Checkbox',
    SLS: 'Select List Single',
    SLM: 'Select List Multiple',
    DP: 'Date Picker',
    DTP: 'Date Time Picker',
    L: 'Labels',
    U: 'URL',
    UP: 'User Picker',
    AN: 'ALPHA_NUMERIC',
  };
  constructor(
    private service: SystemFieldService
  ) { }

  ngOnInit(): void {
    this.getSystemFields();
  }

  getSystemFields(){
    this.loader = true;
    this.service.getCustomFields(this.pageConfig).subscribe((res) =>{
      this.loader = false;
      if(res.status === "success"){
        this.systemFieldsList = res.data.qs;
        this.paginationConfig = res.data;
      }
    },(error) =>{
      this.loader = false;
    })
  }

  changePageSize(){
    this.pageConfig.size = parseInt(this.selectedPageSize);
    this.pageConfig.page = 1;
    this.getSystemFields();
  }

  pageChanged(event: any): void {
    //debugger
    this.pageConfig.page = event.page;
    this.getSystemFields();
    
  }

  ngAfterViewInit(){
    fromEvent(this.searchInput.nativeElement,'keyup')
    .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          // console.log(this.searchInput.nativeElement.value)
          this.pageConfig.page = 1;
          // this.pageConfig.search_text = this.searchInput.nativeElement.value;
          this.getSystemFields()
        })
    )
    .subscribe();
  }

}
