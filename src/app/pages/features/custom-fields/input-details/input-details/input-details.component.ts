import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { StoreService } from '../../service/store.service';
import { Options } from 'select2';
@Component({
  selector: 'ncri-input-details',
  templateUrl: './input-details.component.html',
  styleUrls: ['./input-details.component.scss']
})
export class InputDetailsComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  public options: Options;
  constructor(
    public store: StoreService
  ) {
    this.exampleData = [
      {
        id: 'TSL',
        text: 'Text Single Line'
      },
      {
        id: 'AN',
        text: 'ALPHA_NUMERIC'
      },
      {
        id: 'N',
        text: 'Numeric'
      }
    ];
    this.options = {
      multiple: false,
      minimumResultsForSearch: -1,
      theme: 'custom-select',
      // placeholder: 'Input Type',
    };
  }

  ngOnInit(): void {
    // this.store.customFieldForm;
  }

  valueChanged(value: any): void {
    this.store.customFieldForm.controls.field_type.setValue(value);
    if (this.store.customFieldForm.value.field_type === 'AN') {
      const regex = /^[a-zA-Z0-9 ]+$/;
      this.store.customFieldForm.controls.default_value.setValidators(Validators.compose([Validators.required, Validators.pattern(regex)]));
      this.store.customFieldForm.controls.default_value.updateValueAndValidity();
      this.store.customFieldForm.updateValueAndValidity();
    } else {
      this.store.customFieldForm.controls.default_value.setValidators(Validators.compose([Validators.required]));
      this.store.customFieldForm.controls.default_value.updateValueAndValidity();
      this.store.customFieldForm.updateValueAndValidity();
    }
  }

}
