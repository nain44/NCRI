import { Component, OnInit } from '@angular/core';
import { AfmStoreService } from '../../services/afm-store.service';
import { TempService } from '../../services/temp.service';
import { Options } from 'select2';
import { Router } from '@angular/router';
@Component({
  selector: 'ncri-afmfield-mapping',
  templateUrl: './afmfield-mapping.component.html',
  styleUrls: ['./afmfield-mapping.component.scss']
})
export class AfmfieldMappingComponent implements OnInit {
  fieldList: any = [];
  mappedFieldCheckBox: boolean = true;
  NonMappedFieldCheckBox: boolean = true;
  public options: Options;
  mappedCount: number = 0;
  nonMappedCount: number = 0;
  txtSearch: string = "";
  isFieldsLeft: boolean = false;
  leftFields: any = [];
  constructor(
    public store: AfmStoreService,
    public service: TempService,
    private router: Router
  ) { 

    if(!this.store.fieldMappingForm.controls.file_url.value){
      this.router.navigate(['/field-mapping/upload-file'])
    }
  }

  ngOnInit(): void {
    console.log(this.store.columnNames);
    console.log(this.store.fieldMappingForm.value);
    let arr = this.store.columnNames.map(object => ({...object}))
    this.store.fieldMappingForm.controls.field_mapping_json.setValue(arr);
    this.getCounts();
    this.getSystemFields();
  }

  getSystemFields(){
    let obj = {
        screen_key: "ClientDemographic"
    }
    
    this.service.getSystemFields(obj).subscribe((res) =>{
      if(res.status === "success"){
        this.fieldList = res.data;
        this.fieldList.map(it => {
          it.is_system_field = true;
        });

      }
      this.getCustomFields();
    },(error) =>{

    })
  }

  getCustomFields(){
    let obj = {
        screen_key: "ClientDemographic"
    }
    
    this.service.getCustomFields(obj).subscribe((res) =>{
      if(res.status === "success"){
        res.data.map(it => {
          it.is_system_field = false;
        });
        this.fieldList = [...this.fieldList, ...res.data];
        this.fieldList.map(it =>{
          it.text = it.field_label
        });

        
      }
    },(error) =>{

    })
  }

  mapField(event:any,obj:any){
    if(event && obj){
      let index = this.store.columnNames.findIndex(it => it.field === obj.field);
      if(index >= 0){
        let data = this.fieldList.find(it => it.id === event);
        if(data){
          if(data.is_system_field){
            this.store.columnNames[index].is_system_field = true;
            this.store.fieldMappingForm.controls.field_mapping_json.value[index].is_system_field = true;    
          }else{
            this.store.columnNames[index].is_system_field = false;
            this.store.fieldMappingForm.controls.field_mapping_json.value[index].is_system_field = false;
          }
        }
        this.store.columnNames[index].mapped_field = event;
        this.store.fieldMappingForm.controls.field_mapping_json.value[index].mapped_field = event;
      }
      
    }

    setTimeout(() => {
      this.getCounts();
    }, 100);
  }

  getCounts(){
    //setting count for mapped fields
    this.mappedCount = this.store.columnNames.filter(it => it.mapped_field).length;
    //storing mapped field in formGroup to submit data
    this.nonMappedCount = this.store.columnNames.filter(it => !it.mapped_field).length;
  }
  
  filterData(){
    let data = [];
    data = this.store.fieldMappingForm.controls.field_mapping_json.value.filter(it =>{
      if(this.mappedFieldCheckBox && it.mapped_field && it.field.toLowerCase().includes(this.txtSearch.toLowerCase())){
        return true;
      }else if(this.NonMappedFieldCheckBox && !it.mapped_field && it.field.toLowerCase().includes(this.txtSearch.toLowerCase())){
        return true;
      }else if(!this.NonMappedFieldCheckBox && !this.mappedFieldCheckBox && it.field.toLowerCase().includes(this.txtSearch.toLowerCase())){
        return false;
      }

      return false
    });

    console.log(data);
    this.store.columnNames = data;
  }

  checkMandatoryFields(){
    this.leftFields = [];
    this.fieldList.map(it => {
      let check = this.store.columnNames.some(col => col.mapped_field === it.id);
      if(!check && (it.is_mandatory || it.field_status === 'M')){
        this.leftFields.push(it.field_label);
      }
    });
    if(this.leftFields.length > 0){
      this.isFieldsLeft = true;
      window.scrollTo(0,0);
    }else{
      this.isFieldsLeft = false;
      this.mappedFieldCheckBox = true;
      this.NonMappedFieldCheckBox = true;
      this.filterData();
      this.store.previewMap ? this.router.navigate(['/field-mapping/file-info']) : this.store.previewMap = true;
      window.scrollTo(0,0);
      
    }
  }

  checkBack(): void {
    this.mappedFieldCheckBox = true;
    this.NonMappedFieldCheckBox = true;
    this.filterData();
    this.store.previewMap ? this.store.previewMap = false : this.router.navigate(['/field-mapping/upload-file']);
    window.scrollTo(0,0);
    
  }

}
