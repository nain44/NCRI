import { GlobalService } from 'src/app/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientDemographicService } from './../../services/client-demographic.service';
import { UserDemographicStore } from './../../store/data.store';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare var $;
@Component({
  selector: 'ncri-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment'
  };
  addCommentForm: FormGroup;
  userName: string;

  items = [];

  fileLoader = false;
  fileUploadError = false;
  fileErrorText: string;
  constructor(
    private modalService: BsModalService,
    public store: UserDemographicStore,
    private service: ClientDemographicService,
    private fb: FormBuilder,
    public global: GlobalService

  ) {
    this.initAddCommentForm();
  }

  ngOnInit(): void {
    this.store.isComments = true;
    this.getUser();
    this.items.push(this.userName)
  }
  // init add Comment form
  initAddCommentForm(): void {
    this.addCommentForm = this.fb.group({
      commentText: ['', Validators.required],
      documentUrl: [''],
      // fileName: [''],
    });

  }
  getUser(): string {
    this.userName = localStorage.getItem('details');
    this.userName = JSON.parse(this.userName);
    this.userName = this.userName['user'].username;
    return this.userName;

  }
  addComment(): void {
    const obj = {
      comment_text: this.addCommentForm.value.commentText,
      document_url: this.addCommentForm.value.documentUrl,
      // fileName: this.addCommentForm.value.fileName
    };
    const commentList = this.store.commentsForm.value.comment_list;
    commentList.push(obj);
    this.store.commentsForm.controls.comment_list.setValue(commentList);
    this.closeModal();
  }
  uploadDocument(input: HTMLInputElement): void {
    this.fileErrorText = '';
    this.fileLoader = true;
    const formData = new FormData();
    if (input.files[0].size > 2000000) {
      this.fileErrorText = 'File larger then 2MB';
      this.fileUploadError = true;
      this.fileLoader = false;
      return;
    }
    if (this.global.validateUploadFileExtension(input.files[0].name)) {
      this.fileErrorText = 'Invalid file type. Only PDF, CSV & XLSX are allowed';
      this.fileUploadError = true;
      this.fileLoader = false;
      return;
    }
    formData.append('document_file', input.files[0]);
    // this.addCommentForm.controls.fileName.setValue(input.files[0].name);
    this.service.uploadDocument(formData).subscribe((data) => {
      if (data.status) {
        this.addCommentForm.controls.documentUrl.setValue(data.data.url);
        this.fileLoader = false;
      }
    }, (error) => {
      console.log(error);
      this.fileLoader = false;
    });

  }
  closeModal(): void {
    this.modalRef.hide();
    this.initAddCommentForm();
  }

  openModal(template: any): void {
    this.modalRef = this.modalService.show(
      template, this.config
      );
  }
  select2Init(){
    $(".selectDropdown").select2({
      minimumResultsForSearch: -1
  }); 
  }

  ngAfterViewInit(){
    // this.select2Init();
  }
}
