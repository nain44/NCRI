import { AfmStoreService } from './../../services/afm-store.service';
import { Options } from 'select2';
import { AfmService } from './../../services/afm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncri-afm-edit-field-mapping',
  templateUrl: './afm-edit-field-mapping.component.html',
  styleUrls: ['./afm-edit-field-mapping.component.scss']
})
export class AfmEditFieldMappingComponent implements OnInit {
  fmID: string;
  fmDetails: any;
  fieldsData = [];
  mappedFields = true;
  nonMappedFields = true;
  txtSearch: string = "";
  mappedCount: number = 0;
  nonMappedCount: number = 0;
  public options: Options;
  leftFields: any[] = [];
  isFieldsLeft: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: AfmService,
    private router: Router,
    public store: AfmStoreService) {
    this.store.id = this.route.snapshot.params.id;
    // this.options = {
    //   multiple: false,
    //   templateSelection: (object: any) => {
    //     return object && object.field_label;
    //   },
    //   templateResult: (object: any) => {
    //     return object && object.field_label
    //   }
    // };
  }

  ngOnInit(): void {
    this.FetchFieldMapping();
    this.GetAvailableSystemFields();
    this.GetAvailableCustomFields();

  }

  FetchFieldMapping(): void {
    const obj = {
      id: this.store.id
    }

    this.service.FetchFieldMapping(obj).subscribe((res) => {
      debugger
      if (res.status === 'success') {
        this.fmDetails = res.data;
        this.fmDetails.field_mapping_json = JSON.parse(this.fmDetails?.field_mapping_json);
        this.fmDetails.product_list = JSON.parse(this.fmDetails?.product_list);
        this.store.fieldMappingForm.patchValue({
          id: this.fmDetails.id,
          file_name: this.fmDetails.file_name,
          file_url: this.fmDetails.file_url,
          client_demographic_id: this.fmDetails.client_demographic_id,
          product_list: this.fmDetails.product_list,
          field_mapping_json: this.fmDetails.field_mapping_json,

        });

        this.countData();
      }
    }, (error) => {

    });
  }

  GetAvailableSystemFields(): void {
    const obj = {
      screen_key: 'ClientDemographic'
    }

    this.service.GetAvailableSystemFields(obj).subscribe((res) => {
      debugger
      if (res.status === 'success') {
        res.data.map(it => {
          it.is_system_field = true;
        })
        this.fieldsData = [...this.fieldsData, ...res.data];
        this.fieldsData.map(it =>{
          it.text = it.field_label
        });
      }
    }, (error) => {

    });
  }

  GetAvailableCustomFields(): void {
    const obj = {
      screen_key: 'ClientDemographic'
    }

    this.service.GetAvailableCustomFields(obj).subscribe((res) => {
      debugger
      if (res.status === 'success') {
        res.data.map(it => {
          it.is_system_field = false;
        })
        this.fieldsData = [...this.fieldsData, ...res.data];
        this.fieldsData.map(it =>{
          it.text = it.field_label
        });
      }
    }, (error) => {

    });
  }

  countData(){
    debugger
    let c1 = 0;
    let c2 = 0;
    this.store.fieldMappingForm.value.field_mapping_json.map(it => {
      if(it.mapped_field){
        c1 += 1;
      }else{
        c2 += 1;
      }
    });

    this.mappedCount = c1;
    this.nonMappedCount = c2;
  }

  mapField(event:any, index:any){
    debugger
    if(event && index >= 0){
        let data = this.fieldsData.find(it => it.id === event);
        if(data){
          if(data.is_system_field){
            this.store.fieldMappingForm.controls.field_mapping_json.value[index].is_system_field = true;    
          }else{
            this.store.fieldMappingForm.controls.field_mapping_json.value[index].is_system_field = false;    
          }
        }
    }

    setTimeout(() => {
      this.countData()
    }, 100);
  }

  filterData(){
    debugger
    let data = [];
    data = this.fmDetails.field_mapping_json.filter(it =>{
      if(this.mappedFields && it.mapped_field && it.field.toLowerCase().includes(this.txtSearch.toLowerCase())){
        return true;
      }else if(this.nonMappedFields && !it.mapped_field && it.field.toLowerCase().includes(this.txtSearch.toLowerCase())){
        return true;
      }else if(!this.nonMappedFields && !this.mappedFields && it.field.toLowerCase().includes(this.txtSearch.toLowerCase())){
        return false;
      }

      return false
    });

    console.log(data);
    this.store.fieldMappingForm.value.field_mapping_json = data;
  }

  checkMandatoryFields(){
    this.leftFields = [];
    this.fieldsData.map(it => {
      let check = this.store.fieldMappingForm.value.field_mapping_json.some(col => col.mapped_field === it.id);
      if(!check && (it.is_mandatory || it.field_status === 'M')){
        this.leftFields.push(it.field_label);
      }
    });
    if(this.leftFields.length > 0){
      this.isFieldsLeft = true;
      window.scrollTo(0,0);
    }else{
      this.isFieldsLeft = false;
      this.router.navigate(['/field-mapping/edit-file-info'])
    }
  }


}
