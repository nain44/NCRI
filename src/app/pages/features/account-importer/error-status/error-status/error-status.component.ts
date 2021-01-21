import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AccountImportService } from '../../services';
declare var Pusher;
@Component({
  selector: 'ncri-error-status',
  templateUrl: './error-status.component.html',
  styleUrls: ['./error-status.component.scss']
})
export class ErrorStatusComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'add-comment add-comment--delete '
  };
  currentImporterID: string = "";
  isUploadedSuccess: boolean = false;
  percent: number = 10;
  currentImporter: any;
  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private service: AccountImportService
  ) {

    this.currentImporterID = this.route.snapshot.params.id;

   }

  ngOnInit(): void {
    this.fetchFileImporter();
  }

  ngAfterViewInit(){
  }

  fetchFileImporter(){
    let obj = {
      id: this.currentImporterID
    }

    this.service.fetchAccountImporterByID(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.currentImporter = res.data;
        !this.currentImporter.last_task_message ? this.currentImporter.last_task_message= "We found an error in your uploading file. Please recheck your file and upload again." : "";
      }
    },(error) =>{
      
    })
  }

  testingMethod(){
    setInterval(() =>{
      if(this.percent < 100){
        this.percent += 10;  
      }else{
        this.isUploadedSuccess = true;
      }
      
    },2000)
  }

  testPusher(){
    var pusher = new Pusher('f8f0b2afd8b09d18b145', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
  }
}
