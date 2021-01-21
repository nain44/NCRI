import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AfmStoreService } from '../../services/afm-store.service';
import { TempService } from '../../services/temp.service';

@Component({
  selector: 'ncri-afmupload-file',
  templateUrl: './afmupload-file.component.html',
  styleUrls: ['./afmupload-file.component.scss']
})
export class AfmuploadFileComponent implements OnInit, OnDestroy {
  
  fileName: string = "";
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete '
  };
  @ViewChild('fileInfo') fileInfo: TemplateRef<any>;
  @ViewChild('fileUploadErrorModal') fileUploadErrorModal : TemplateRef<any>;
  fileUploadError = false;
  errorMessage: string = "";
  requiredFields: string = "Third Party Platform,Return Merchnadise type,Dropdown for Interest Rate cycle type,Interest Rate to Charge,Invoice Format Code,Client Remittance Type,Correspondence Language,Start Date,Client Group,Client Status,Sales Repesentative,Default Commission,Currency,Client Type,Email,Cell,Phone,Postal Code,Country,Province,City,Address Line One,Cell/Phone no.,Country code,Email,Full Name,Contact Title,Primary contact,Business Type,Product,Client No.,Client Name,Short Name,Ace Client No.,Demo 3.1,Demo Test List";
  //creating mapping for errors for file
  fileErrorMapping = {
    ERR_InvalidFileExtension:false,
    ERR_InvalidExcelSheetName:false,
    ERR_DuplicateColumnsExists:false
  }
  showFailed: boolean = false;
  constructor(
    private modalService: BsModalService,
    private service: TempService,
    public store: AfmStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  dropFile(event: any) {
      this.uploadedFile(event, 'drop');
  }

  uploadedFile($event, type?: any){
    let file;
    if (type === 'drop') {
      file = $event[0];
    } else {
      if ($event.currentTarget.files.length > 0) {
        file = $event.currentTarget.files[0];
      }
    }
    this.uploadFileForMapping(file)
  }

  openFileUploader() {
      document.getElementById('txtFile').click()
  }

  uploadFileForMapping(file:any){
    this.fileUploadError = false;
    this.store.uploadComplete = '50%';
    this.deleteFile();
    this.errorMessage = "";
    // this.requiredFields = "";
    this.store.fileLoader = true;
    this.store.fileName = file.name;
    let formData = new FormData();
    formData.append("field_mapping_file",file);
    formData.append("screen_key",'ClientDemographic');
    this.service.uploadFile(formData).subscribe((res) =>{
      // this.store.fileLoader = false;
      document.getElementById('txtFile')['value'] = "";
      if(res.status === "success"){
        // if(res.data.required_fields){
        //   this.requiredFields = res.data.required_fields.toString();
        // }
        this.store.fieldMappingForm.controls.file_url.setValue(
          res?.data?.url ? res?.data?.url : ""
        )
        this.store.columnNames = [];
        if(res?.data?.column_names.length > 0){
          res?.data?.column_names.map(it => {
            this.store.columnNames.push({field:it,mapped_field:"",is_system_field:false})  
          })
          
        }
        this.store.uploadComplete = '100%';
      }else{
        document.getElementById('txtFile')['value'] = "";
        // alert(res?.message ? res?.message : "Sorry something went wrong");
        // this.deleteFile();
        this.fileErrorMapping[res.code] = true;
        this.errorMessage =  res.code;
        // if(res.code === "ERR_InvalidFileExtension"){
        //   this.errorMessage = "Only csv and xlsx is allowed.";
        // }else if(res.code === "ERR_InvalidExcelSheetName"){
        //   this.errorMessage = "Sheet name is invalid.";
        // }else if(res.code === "ERR_DuplicateColumnsExists"){
        //   this.errorMessage = (res.message ? res.message : "") + " Following columns are duplicate.";
        // }else{
        //   this.errorMessage = "";
        // }
        this.fileUploadError = true;
        this.store.uploadComplete = 'Failed';
        debugger
        for(var key in this.fileErrorMapping){
          if(this.fileErrorMapping[key] === true){
            this.showFailed = true;
          }
        }
      }
     
      
    },(error) =>{
      document.getElementById('txtFile')['value'] = "";
      this.deleteFile();
      // this.store.fileLoader = false;
    })
  }

  deleteFile(){
    this.store.fileName = "";
    this.store.fieldMappingForm.controls.file_url.setValue("");
    this.store.columnNames = [];
    this.store.fileLoader = false;
  }

  openFileDetailModal(){
    this.modalRef = this.modalService.show(this.fileInfo, this.config);
  }

  openFileUploadedErrorModal(){
    this.modalRef = this.modalService.show(this.fileUploadErrorModal, this.config);
  }

  proceed(){
    this.modalRef.hide();
    setTimeout(() => {
      this.router.navigate(['/field-mapping/map']);
    }, 1000);
  }

  ngOnDestroy(){
    // this.deleteFile();
    // this.store.initFieldMapping();
  }

}
