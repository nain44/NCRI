import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountImportService } from '../../services';
import { AccountImporterStore } from '../../store';
declare var Pusher;
@Component({
  selector: 'ncri-import-status',
  templateUrl: './import-status.component.html',
  styleUrls: ['./import-status.component.scss']
})
export class ImportStatusComponent implements OnInit {
  @ViewChild('rollbackModal') rollbackModal: TemplateRef<any>;
  @ViewChild('rollbackConfirmation') confirmationModal: TemplateRef<any>;
  modalRef: BsModalRef;
  confirmModalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'add-comment add-comment--delete '
  };
  currentImporterID: string = "";
  isUploadedSuccess: boolean = false;
  // fileUploadedModel = {
	//   total_entries: 0,
	//   processed_entries: 0,
	//   uploaded_percentage: 0,
	// }
  rollbackLoader: boolean = false;
  responseText: string = "";
  currentImporter: any;
  downloadFileLoader: boolean= false;
  // selectedAccount: any;
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private store: AccountImporterStore,
    private service: AccountImportService
  ) {

    this.currentImporterID = this.route.snapshot.params.id;
    if(this.route.snapshot.queryParams.isUploaded){
      this.isUploadedSuccess = true
    }
   }

  ngOnInit(): void {
    this.subscribeToEvent();
    this.fetchFileImporter();
  }

  subscribeToEvent() {
    this.store.channel.bind(this.currentImporterID, (data) => {
      // debugger
      // this.currentImporter = data;
      //realtime response json
      // "{"status":"R","message":"Task is running ...","total_entries":0,"processed_entries":0,"uploaded_percentage":0}"

      //checking if flie uploading fails return user to error screen
      if(data.status === 'E'){
        this.store.IsNew = false;
        this.router.navigate(['/account-importer/error/'+this.currentImporterID])
        return
      }else if(data.status === 'D'){
        this.store.IsNew = false;
        this.router.navigate(['/account-importer/edit-account-importer/'+this.currentImporterID],{ queryParams: { isdeclined: true } })
        return
      }

      data.total_entries ? this.currentImporter.total_entries = data.total_entries : "";
      data.processed_entries ? this.currentImporter.processed_entries = data.processed_entries : "";
      data.uploaded_percentage ? this.currentImporter.uploaded_percentage = data.uploaded_percentage : "";
      data.status ? this.currentImporter.status = data.status : "";
      
      if(data.uploaded_percentage){
        if(data.uploaded_percentage < 100){
          this.currentImporter.uploaded_percentage = data.uploaded_percentage;
        }else if(data.uploaded_percentage >= 100){
          this.currentImporter.uploaded_percentage = 100;
          this.isUploadedSuccess = true;
        }
      }
      
    })
  }

  ngAfterViewInit(){
    // this.testingMethod();
  }

  fetchFileImporter(){
    let obj = {
      id: this.currentImporterID
    }

    this.service.fetchAccountImporterByID(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.currentImporter = res.data;
      }
    },(error) =>{
      
    })
  }

  testingMethod(){
    setInterval(() =>{
      if(this.currentImporter?.uploaded_percentage < 100){
        this.currentImporter.uploaded_percentage += 10;  
      }else if(this.currentImporter?.uploaded_percentage === 100){
        this.isUploadedSuccess = true;
      }
      
    },2000)
  }

  redirect(url:string){
    this.modalRef.hide();
    let $timer = setTimeout(() => {
      this.router.navigate([url]);
      clearTimeout($timer);
    }, 1000);
  }


    //rollback implementation
    openRollbackConfirmationModal(obj:any){
      this.confirmModalRef = this.modalService.show(this.confirmationModal, this.config);
      // this.selectedAccount = obj;
    }
    
  openRollbackModal() {
    this.modalRef = this.modalService.show(this.rollbackModal, this.config);
  }

  rollbackFile(){
    this.rollbackLoader = true;
    let body = {
      id: this.currentImporterID
    }
    this.service.rollbackImporter(body).subscribe((res) =>{
      this.rollbackLoader = false;
      
      if (res.status === "success") {
        this.confirmModalRef.hide();
        this.openRollbackModal()
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

  downloadFile(){
    this.downloadFileLoader = true;
    let obj = {
      id: this.currentImporterID
    }
    this.service.downloadImporterFile(obj).subscribe((res) =>{
      this.downloadFileLoader = false;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(res);
      link.download = this.currentImporter.file_name;
      link.click();
    },(error) =>{
      this.downloadFileLoader = false;
      console.log(error);
    })
  }

}
