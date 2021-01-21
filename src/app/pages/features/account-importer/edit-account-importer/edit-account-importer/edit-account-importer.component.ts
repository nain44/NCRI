import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountImportService } from '../../services';
import { Options } from 'select2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountImporterStore } from '../../store';

@Component({
  selector: 'ncri-edit-account-importer',
  templateUrl: './edit-account-importer.component.html',
  styleUrls: ['./edit-account-importer.component.scss']
})
export class EditAccountImporterComponent implements OnInit {


  @ViewChild('importModal') importModal: TemplateRef<any>;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'add-comment add-comment--delete '
  };
  fieldMappingList: any = [];
  public options: Options;
  public accountImporterForm: FormGroup;
  fileList: any[] = [];
  isError: boolean = false;
  filePercentAge: string = "50%";
  loader: boolean = false;
  currentImporterID: string = "";
  isDeclined: any = false;
  createdAt: any;
  constructor(
    private modalService: BsModalService,
    private service: AccountImportService,
    private fb: FormBuilder,
    public global: GlobalService,
    private router: Router,
    public store: AccountImporterStore,
    private route: ActivatedRoute,
  ) { 

    this.currentImporterID = this.route.snapshot.params.id;
    if(this.route.snapshot.queryParams.isdeclined){
      this.isDeclined = true
    }
    

  }

  ngOnInit(): void {
    this.fetchFileImporter();
    this.getFieldMappingList();
    this.initAccountImporterform();
  }

  fetchFileImporter(){
    let obj = {
      id: this.currentImporterID
    }

    this.service.fetchAccountImporterByID(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.accountImporterForm.patchValue(res.data);
        this.createdAt = res.data.created_at;
        let obj = {
          name: res.data.file_name
        }
        this.fileList = [obj];
        this.filePercentAge = "100%";
      }
    },(error) =>{
      
    })
  }

  initAccountImporterform() {
    this.accountImporterForm = this.fb.group({
      file_name: ['', Validators.required],
      file_url: ['', Validators.required],
      field_mapping_id: ['', Validators.required],
    })
  }

  openImportModal() {
    this.modalRef = this.modalService.show(this.importModal, this.config);
  }

  getFieldMappingList() {
    this.service.getFieldMappingList().subscribe((res) => {
      if (res.status === "success") {
        this.fieldMappingList = res.data;
        this.fieldMappingList.map(it => it.text = it.file_name);
      }
    }, (error) => {

    })
  }

  dropFile(event: any) {
    this.uploadedFile(event, 'drop');
  }

  uploadedFile($event, type?: any) {
    let file;
    if (type === 'drop') {
      file = $event[0];
    } else {
      if ($event.currentTarget.files.length > 0) {
        file = $event.currentTarget.files[0];
      }
    }
    this.uploadAccountImportFile(file)
  }

  openFileUploader() {
    document.getElementById('txtFile').click()
  }

  uploadAccountImportFile(file){
    this.isError = false;
    this.filePercentAge = "50%";
    let formData = new FormData();
    formData.append("document_file", file);
    this.accountImporterForm.controls.file_name.setValue(file.name);
    this.accountImporterForm.controls.file_url.setValue("");
    this.fileList = [{name: file.name,}]
    this.service.uploadFile(formData).subscribe((res) =>{
      this.filePercentAge = "100%";
      if(res.status === "success"){
        this.accountImporterForm.controls.file_url.setValue(res.data.url);   
      }else{
        this.isError = true;
      }
    },(error) =>{
      this.isError = true;
    })
  }

  deleteFile(){
    this.fileList = [];
    this.accountImporterForm.controls.file_url.setValue("");
    this.accountImporterForm.controls.file_name.setValue("");
  }

  updateAccountImporter(){
    let obj = this.accountImporterForm.value;
    obj.id = this.currentImporterID;
    this.loader = true;
    this.service.updateAccountImporter(obj).subscribe((res) =>{
      this.loader = false;
      if(res.status === "success"){
        this.store.currentFileID = this.currentImporterID;
        this.openImportModal();
      }
    },(error) =>{
      this.loader = false;
    })
  }

  redirect(url:string){
    this.modalRef.hide();
    let $timer = setTimeout(() => {
      this.router.navigate([url]);
      clearTimeout($timer);
    }, 1000);
  }


}
