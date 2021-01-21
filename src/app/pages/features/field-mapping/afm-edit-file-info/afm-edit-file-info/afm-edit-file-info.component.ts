import { TempService } from './../../services/temp.service';
import { AfmStoreService } from './../../services/afm-store.service';
import { AfmService } from './../../services/afm.service';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Options } from 'select2';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { filter, pairwise } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ncri-afm-edit-file-info',
  templateUrl: './afm-edit-file-info.component.html',
  styleUrls: ['./afm-edit-file-info.component.scss']
})
export class AfmEditFileInfoComponent implements OnInit {
  public options: Options;
  clientList = [];
  modalRef: BsModalRef;
  clientName:string = "";
  @ViewChild('fileUpdated') fileAdded: TemplateRef<any>;
  items = [];
  previousUrl: string;
  loader: boolean = false;
  count = 0;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'add-comment add-comment--delete '
  };

  constructor(
    private route: ActivatedRoute,
    private service: AfmService,
    private tempService: TempService,
    public store: AfmStoreService,
    private modalService: BsModalService,
    public router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('prev:', event.url);
        this.previousUrl = event.url;
      });
    this.options = {
      multiple: false,
      templateSelection: (object: any) => {
        return object && object.company_name;
      },
      templateResult: (object: any) => {
        return object && object.company_name
      }
    };
  }

  ngOnInit(): void {
    if(this.store.id === ""){
      this.router.navigate(['/field-mapping']);
    }
    this.ClientDemographicDropdownList();
  }

  onSelect(value: any) {
    debugger
    if(this.count === 0) {
      this.count = 1;
      return;
    } 
    if (value) {
      this.getProduct(value);
    }
  }

  getProduct(id) {
    let obj = {
      "id": id
    }
    this.items = [];
    this.store.fieldMappingForm.controls.product_list.setValue(new Array());
    this.tempService.fetchProduct(obj).subscribe((res) => {
      if (res.status === "success") {
        this.items = [{ id: 1, name: res.data.product }];
      }
    }, (error) => {

    })
  }

  ClientDemographicDropdownList(): void {
    this.service.ClientDemographicDropdownList().subscribe((res) => {
      debugger
      if (res.status === 'success') {
        this.clientList = res.data;
        this.clientList.map(it => {
          it.text = it.company_name
        })

      }
    }, (error) => {

    });
  }

  updateFieldMapping(): void {
    this.loader = true;
    debugger
    let obj = Object.assign({}, this.store.fieldMappingForm.value);
    obj.product_list = obj.product_list.map(it => it.name ? it.name : it);
    obj.id = this.store.id;
    obj.field_mapping_json.map(it => {
      it.column_name = it.field,
      it.mapped_field_id = it.mapped_field
    })
    this.service.updateFieldMapping(obj).subscribe((res) => {
      this.loader = false;
      if (res.status === 'success') {
        let data = this.clientList.find(it => it.id === obj.client_demographic_id);
        if(data){
          this.clientName = data.text;
        }

        this.openModal();

      }
    }, (error) => {
      this.loader = false;
    });
  }

  clearForm(){
    this.store.initFieldMapping();
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
