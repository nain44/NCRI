import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class AfmStoreService {
  public fieldMappingForm: FormGroup;
  id: string = "";
  fileName: string = "";
  public columnNames: any = [];
  previewMap = false;
  fileLoader: boolean;
  uploadComplete = '50%';
  

  constructor(
    private fb: FormBuilder,
  ) { 

    this.initFieldMapping();
  }


  //init field mapping form
  initFieldMapping(){
    this.fieldMappingForm = this.fb.group({
      file_name: ['', Validators.required],
      file_url: ['', Validators.required],
      client_demographic_id: ['', Validators.required],
      product_list: [new Array()],
      field_mapping_json: [new Array(), Validators.required],
    })
  }

}
