import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { fromEvent } from 'rxjs';
import { GradeService } from '../service';

@Component({
  selector: 'ncri-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit, AfterViewInit {
  dataLoader = false;
  selectedOBJ: any;
  modalRef: BsModalRef;
  loader = false;
  responseText: any = '';
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };
  pageSize = 5;
  searchGrade = '';
  page = 1;
  totalPages: number;
  @ViewChild('searchInput') searchInput: ElementRef;
  pageConfig: any = {
    size: this.pageSize,
    page: 1,
    filter_by: 'ALL',
    count: 0
  };
  gradesList: any = [];
  constructor(
    private modalService: BsModalService,
    private service: GradeService,
    private router: Router
  ) { }
  ngOnInit(): void {
    // this.getGradeList();
    this.postGradeList();
  }
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          this.page = 1;
          this.postGradeList();
        })
      )
      .subscribe();
  }
  loadNext(): void {
    this.page++;
    this.postGradeList();
  }
  getSearchGrade(): void {
    this.postGradeList();

  }

  postGradeList(page?: number): void {
    this.dataLoader = true;
    const obj = {
      size: this.pageSize,
      page: page ? page : this.page,
      search_text: this.searchGrade
    };
    this.service.postGradeList(obj).subscribe((res) => {
      // debugger
      if (res.status === 'success') {
        obj.search_text === '' ? this.gradesList = [...this.gradesList, ...res.data?.qs] :
          this.gradesList = res.data?.qs;
        this.totalPages = res.data?.num_pages;
      }
      this.dataLoader = false;
    }, (error) => {
      // debugger
      this.dataLoader = false;
    });
  }
  getGradeList(): void {
    this.dataLoader = true;
    this.service.getGradeList().subscribe((res) => {
      // debugger
      if (res.status === 'success') {
        this.gradesList = res.data;
      }
      this.dataLoader = false;
    }, (error) => {
      // debugger
      this.dataLoader = false;
    });
  }

  openDeleteModal(template: any, obj: any): void {
    this.selectedOBJ = obj;
    this.modalRef = this.modalService.show(template, this.config);
  }

  deleteUserGrade(): void {
    // debugger
    this.loader = true;
    this.service.deleteGrade({ id: this.selectedOBJ.id }).subscribe((res) => {
      if (res.status === 'error') {
        if (res.errors) {
          const list = [];
          for (var key in res.errors) {
            list.push(res.errors[key].toString());
          }
          this.responseText = list.toString();
        } else {
          this.responseText = res.code;
        }
      } else {
        this.getGradeList();
        this.modalRef.hide();
      }
      this.loader = false;
    }, (error) => {
      this.loader = false;
    });
  }

  redirectToEdit(obj: any): void {
    this.router.navigate(['/grade/edit-grade'], { queryParams: { id: obj.id } });
  }

  redirectToView(obj: any): void {
    this.router.navigate(['/grade/view-grade'], { queryParams: { id: obj.id } });
  }

}
