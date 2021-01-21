import { APP_CONFIG } from 'src/app/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class StoreService {
  //form group for add custom field input
  public customFieldForm: FormGroup;
  screens = [
    {
      id: 'cmg_custom_fields',
      label: 'Client Management - Custom Fields',
      assign: false

    },
    {
      id: 'cmg_custom_fields_demo',
      label: 'Client Management - Custom Fields Demo',
      assign: false

    },
  ];

  fieldTypeMap = {
    TSL: 'Text Single Line',
    TML: 'Text Multiple Line',
    N: 'Numeric',
    RB: 'Radio Button',
    C: 'Checkbox',
    SLS: 'Select List Single',
    SLM: 'Select List Multiple',
    DP: 'Date Picker',
    DTP: 'Date Time Picker',
    L: 'Labels',
    U: 'URL',
    UP: 'User Picker',
    AN: 'ALPHA_NUMERIC',
  };
  public dropdownList = []
  public fileList = [];
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {

    //init form custom field form
    this.initCustomFieldForm();

  }


  FetchAssignedScreenOrientation(body): Observable<any> {
    const url = APP_CONFIG.apiBaseUrl + '/api/v1/cmf/FetchAssignedScreenOrientation/';
    return this.httpClient.post(url, body);
  }

  AddCustomField(): Observable<any> {
    const url = APP_CONFIG.apiBaseUrl + '/api/v1/cmf/AddCustomField/';
    this.customFieldForm.controls.character_limit.setValue(+(this.customFieldForm.value.character_limit));
    return this.httpClient.post(url, this.customFieldForm.value);
  }
  EditCustomField(): Observable<any> {
    const url = APP_CONFIG.apiBaseUrl + '/api/v1/cmf/EditCustomField/';
    this.customFieldForm.controls.character_limit.setValue(+(this.customFieldForm.value.character_limit));
    return this.httpClient.post(url, this.customFieldForm.value);
  }
  CustomFieldList(body): Observable<any> {
    const url = APP_CONFIG.apiBaseUrl + '/api/v1/cmf/CustomFieldList/';
    return this.httpClient.post(url, body);
  }
  DeleteCustomField(body): Observable<any> {
    const url = APP_CONFIG.apiBaseUrl + '/api/v1/cmf/DeleteCustomField/';
    return this.httpClient.post(url, body);
  }
  FetchCustomField(body): Observable<any> {
    const url = APP_CONFIG.apiBaseUrl + '/api/v1/cmf/FetchCustomField/';
    return this.httpClient.post(url, body);
  }

  initCustomFieldForm() {
    const optionArray = [{
      id: '',
      name: 'name',
      is_active: true,
      is_deleted: false,
      item_index: 0
    }];
    this.customFieldForm = this.fb.group({
      field_label: ['', Validators.required],
      field_type: ['', Validators.required],
      description: [''],
      character_limit: [''],
      default_value: [],
      options_array: [optionArray],
      is_mandatory: [false],
      is_enabled: [true],
      is_searchable: [false],
      assigned_screens: [],
      assigned_screen_orientations: []
    })
  }
}
