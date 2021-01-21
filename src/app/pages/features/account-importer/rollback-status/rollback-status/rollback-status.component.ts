import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountImportService } from '../../services';
import { AccountImporterStore } from '../../store';
declare var Pusher;
@Component({
  selector: 'ncri-rollback-status',
  templateUrl: './rollback-status.component.html',
  styleUrls: ['./rollback-status.component.scss']
})
export class RollbackStatusComponent implements OnInit {

  @ViewChild('rollbackModal') rollbackModal: TemplateRef<any>;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'add-comment add-comment--delete '
  };
  currentImporterID: string = "";
  isRollbackSuccess: boolean = false;
  // fileUploadedModel = {
	//   total_entries: 0,
	//   processed_entries: 0,
	//   uploaded_percentage: 0,
	// }
  currentImporter: any;
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private store: AccountImporterStore,
    private service: AccountImportService
  ) {

    this.currentImporterID = this.route.snapshot.params.id;

   }

  ngOnInit(): void {
    this.subscribeToEvent();
    this.fetchFileImporter();
  }

  subscribeToEvent(){
    this.store.rollbackChannel.bind(this.currentImporterID, (data) =>{
      debugger
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
      data.rollback_percentage ? this.currentImporter.rollback_percentage = data.rollback_percentage : "";
      data.status ? this.currentImporter.status = data.status : "";

      if(data.rollback_percentage !== undefined){
        if(data.rollback_percentage <= 100 && data.rollback_percentage > 0){
          this.currentImporter.rollback_percentage = data.rollback_percentage;
        }else if(data.rollback_percentage === 0){
          this.currentImporter.rollback_percentage = 0;
          this.isRollbackSuccess = true;
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
        if(this.currentImporter.rollback_percentage === 0){
          this.isRollbackSuccess = true;
        }
      }
    },(error) =>{
      
    })
  }

  testingMethod(){
    // this.percent = 10;
    setInterval(() =>{
      if(this.currentImporter?.uploaded_percentage < 100){
        this.currentImporter.uploaded_percentage += 10;  
      }else if(this.currentImporter?.uploaded_percentage === 100){
        this.isRollbackSuccess = true;
      }
      
    },5000)
  }

  redirect(url:string){
    this.modalRef.hide();
    let $timer = setTimeout(() => {
      this.router.navigate([url]);
      clearTimeout($timer);
    }, 1000);
  }

  openRollbackModal() {
    this.modalRef = this.modalService.show(this.rollbackModal, this.config);
  }

}
