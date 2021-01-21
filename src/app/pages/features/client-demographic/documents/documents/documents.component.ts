import { ClientDemographicService } from './../../services/client-demographic.service';
import { UserDemographicStore } from './../../store/data.store';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  fileList = [];
  // tslint:disable-next-line: variable-name
  document_type_id = [];
  formValid = true;
  uploadDocumentList: any[] = [];
  errorMessage: string
  selectedDocumentType: any;
  constructor(
    public store: UserDemographicStore,
    private service: ClientDemographicService,
    public global: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.isDocuments = true;
    this.getDocument_type_id();

    //setting old variables
    if(this.store.documentsForm.controls.document_list.value){
      this.fileList = [...this.store.documentsForm.controls.document_list.value];
      this.uploadDocumentList = [...this.store.documentsForm.controls.document_list.value];
    }

  }
  /**
   * on file drop handler
   */
  onFileDropped(event): void {
    this.uploadDocument(event, 'drop');
  }

  isValid(form): void {
    form.controls.document_list.setValue(this.fileList);
    this.fileList.length === 0 ? this.formValid = false : this.formValid = true;
  }
  getDocument_type_id(): void {
    this.service.getDocument_type_id().subscribe((data) => {
      if (data.status) {
        this.document_type_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  deleteFile(index:any): void {
    // this.fileList = this.fileList.filter(it => it.document_url !== file.document_url);
    this.fileList.splice(index, 1);
    // this.uploadDocumentList.splice(index, 1);
  }

  deleteDocument(index:any){
    // this.fileList.splice(index,1);
    this.uploadDocumentList.splice(index,1);
  }

  getSelectedDocumentType(typeID): void {
    this.selectedDocumentType = this.document_type_id.filter(it => it.id === typeID);
  }
  uploadDocument(input: any, type: string): void {
    this.errorMessage = '';
    debugger
    if (type === 'drop' ? input.length === 0 : input.files.length === 0) {
      this.errorMessage = 'Please select file';
      return;
    }
    if (!this.selectedDocumentType || !this.selectedDocumentType[0]?.name) {
      this.errorMessage = 'Please select file type first';
      return;
    }
    const formData = new FormData();
    type === 'drop' ? formData.append('document_file', input[0]) :
      formData.append('document_file', input.files[0]);
    if (this.global.validateUploadFileExtension(type === 'drop' ? input[0].name : input.files[0].name,
    this.selectedDocumentType[0]?.name)) {
      this.errorMessage = 'Please select correct file type';
      return;
    }
    this.service.uploadDocument(formData).subscribe((data) => {
      if (data.status) {
        const obj = {
          document_url: data.data.url,
          filename: type === 'drop' ? input[0].name : input.files[0].name,
          id: '',
          is_deleted: false,
          created_at: new Date(),
          user__first_name:this.global.userFullName.split(' ')[0],
          user__last_name:this.global.userFullName.split(' ')[1],
          document_description:this.store.documentsForm.controls.document_description.value,
          document_type__name:this.getTypeName(this.store.documentsForm.controls.document_type_id.value)
        };
        this.fileList.push(obj);
        // this.store.documentsForm.controls.document_list.setValue(this.fileList);
      }
    }, (error) => {
      console.log(error);
    });
  }

  addToList(){
    this.uploadDocumentList = [...new Set([...this.uploadDocumentList , ...this.fileList])];
    this.fileList = [];
  }

  getTypeName(type:any){
    if(type){
      let obj = this.document_type_id.find(it => it.id === type);
      return obj ? obj.name : "N/A";
    }
  }

  nextPage(){
    this.store.documentsForm.controls.document_list.setValue(this.fileList);
    this.router.navigate(['/add-client/portal-settings']);
  }

}
