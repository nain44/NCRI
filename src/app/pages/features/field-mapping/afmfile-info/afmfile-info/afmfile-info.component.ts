import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AfmStoreService } from '../../services/afm-store.service';
import { TempService } from '../../services/temp.service';
import { Options } from 'select2';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'ncri-afmfile-info',
  templateUrl: './afmfile-info.component.html',
  styleUrls: ['./afmfile-info.component.scss']
})
export class AfmfileInfoComponent implements OnInit {
  selectedUsers: any = [];
  public options: Options;
  clientList: any = [];
  items = [
    // {
    //   id: 1,
    //   name: 'saddsfgkj'
    // },
    // {
    //   id: 12,
    //   name: 'saddsghjhf'
    // },
    // {
    //   id: 13,
    //   name: 'saddghfdsf'
    // },
    // {
    //   id: 14,
    //   name: 'sasdaddsf'
    // },
  ];
  loader: boolean = false;
  clientName: string = "";
  modalRef: BsModalRef;

  @ViewChild('fileAdded') fileAdded: TemplateRef<any>;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'add-comment add-comment--delete '
  };
  constructor(
    public store: AfmStoreService,
    public service: TempService,
    private router: Router,
    private modalService: BsModalService,
  ) { 

    if(!this.store.fieldMappingForm.controls.file_url.value){
      this.router.navigate(['/field-mapping/upload-file'])
    }
  }

  ngOnInit(): void {
    this.getClients();
  }


  getClients(){
    this.service.getClients().subscribe((res) =>{
      if(res.status === "success"){
        this.clientList = res.data;
        this.clientList.map(it => {
          it.text = it.company_name
        })
      }
    },(error) =>{

    })
  }

  onSelect(value:any){
    debugger
    if(value){
      this.getProduct(value);
    }
  }

  getProduct(id){
    let obj = {
      "id": id
    }
    this.items = [];
    this.store.fieldMappingForm.controls.product_list.setValue(new Array());
    this.service.fetchProduct(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.items = [{id:1,name:res.data.product}];
      }
    },(error) =>{

    })
  }

  MapField(){
    debugger
    this.loader = true;
    let obj = Object.assign({},this.store.fieldMappingForm.value);
    obj.product_list = obj.product_list.map(it => it.name);
    obj.field_mapping_json.map(it => {
      it.column_name = it.field,
      it.mapped_field_id = it.mapped_field
    })
    // obj.field_mapping_json = obj.field_mapping_json.filter(it => it.mapped_field);
    this.service.addFieldMapping(obj).subscribe((res) =>{
      this.loader = false;
      if(res.status === "success"){
        let data = this.clientList.find(it => it.id === obj.client_demographic_id);
        if(data){
          this.clientName = data.text;
        }
        this.openModal();
        
      }
      
    },(error) =>{
      this.loader = false;
    })
  }

  clearForm(){
    this.store.initFieldMapping();
    this.store.columnNames = [];
    this.store.fileName = "";
  }

  goToDashboard(){
    this.modalRef.hide();
    this.clearForm();
    setTimeout(() => {
      this.router.navigate(['/field-mapping']);
    }, 1000);
  }

  openModal() {
    this.modalRef = this.modalService.show(this.fileAdded, this.config);
  }

}
