import { Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from './../../service/store.service';
import { Select2OptionData } from 'ng-select2';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Options } from 'select2';

@Component({
  selector: 'ncri-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss']
})
export class EditInputComponent implements OnInit {
  exampleData: Array<Select2OptionData>;
  public options: Options;
  loader = false;
  customField: any;
  AssignedScreenOrientation: any;
  AssignedScreenOrientationList = [];
  screens = [];
  selectedScreen: string;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete '
  };
  configs = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-lg'
  };
  fieldID: string;
  constructor(
    private route: ActivatedRoute,
    public store: StoreService,
    private modalService: BsModalService,
    public router: Router
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
      placeholder: 'Input Type',
    };
  }
  ngOnInit(): void {
    this.FetchCustomField();
  }
  EditCustomField(): void {
    this.store.customFieldForm.addControl('id', new FormControl('', Validators.required));
    this.store.customFieldForm.controls.id.setValue(this.fieldID);
    this.store.EditCustomField().subscribe((res) => {
      this.loader = false;
      debugger
      this.router.navigate(['/custom-fields']);

    }, (error) => {
      debugger
      this.loader = false;

    });
  }
  savePosition(): void {
    let screenIndex = -1;
    const AssignedScreenOrientationListIndex = this.AssignedScreenOrientationList.findIndex(it => it.screen_key ===
      this.AssignedScreenOrientation.screen_key);
    AssignedScreenOrientationListIndex !== -1 ?
      this.AssignedScreenOrientationList[AssignedScreenOrientationListIndex].form_json.form.push() :
      this.AssignedScreenOrientationList.push(this.AssignedScreenOrientation);
    this.AssignedScreenOrientationList.forEach(element => {
      screenIndex = this.store.customFieldForm.value.assigned_screens.findIndex(it => it.screen_key === element.screen_key);
    });
    screenIndex !== -1 ?
      this.store.customFieldForm.controls.assigned_screen_orientations.setValue(this.AssignedScreenOrientationList) : '';
    this.modalRef.hide();



  }
  openPreviewFields(preview: TemplateRef<any>, screen: any): void {
    debugger
    this.selectedScreen = screen;
    const obj = {
      screen_key: screen.id
    };
    this.store.FetchAssignedScreenOrientation(obj).subscribe((res) => {
      this.loader = false;
      debugger
      if (res.status === 'error') {
        const mapKey = (this.store.customFieldForm.value.field_label).replaceAll(' ', '_');
        this.AssignedScreenOrientation = {
          screen_key: screen.id,
          form_json: {
            key: screen.id,
            label: screen.label,
            form: [
              {
                map_key: mapKey,
                value: this.store.customFieldForm.value.field_label,
                display_name: this.store.customFieldForm.value.field_label,
                required: this.store.customFieldForm.value.is_mandatory,
                input_type: this.store.customFieldForm.value.field_type,

              }
            ]
          }

        };
      } else {
        const form = JSON.parse(res.data[0].form_json);
        this.AssignedScreenOrientation = res.data[0];
        this.AssignedScreenOrientation.form_json = form;
      }
      this.modalRef = this.modalService.show(preview, this.configs);
    }, (error) => {
      debugger
      this.loader = false;
      const mapKey = (this.store.customFieldForm.value.field_label).replaceAll(' ', '_');
      this.AssignedScreenOrientation = {
        screen_key: screen.id,
        form_json: {
          key: screen.id,
          label: screen.label,
          form: [
            {
              map_key: mapKey,
              value: this.store.customFieldForm.value.field_label,
              display_name: this.store.customFieldForm.value.field_label,
              required: this.store.customFieldForm.value.is_mandatory,
              input_type: this.store.customFieldForm.value.field_type,

            }
          ]
        }

      };
      this.modalRef = this.modalService.show(preview, this.configs);
    });
    // this.modalRef.content.preview = 'Close';
  }
  addToAssignedScreens(screenID): void {
    const screenOrientationKey = this.AssignedScreenOrientationList.findIndex(it => it.screen_key === screenID);
    const screenKey = this.screens.findIndex(it => it.screen_key === screenID);
    screenKey !== -1 ? this.screens.splice(screenKey, 1) : this.screens.push({ screen_key: screenID });
    this.store.customFieldForm.controls.assigned_screens.setValue(this.screens);
    screenOrientationKey !== -1 && screenKey !== -1 ? this.AssignedScreenOrientationList.splice(screenOrientationKey, 1) : '';
    this.store.customFieldForm.controls.assigned_screen_orientations.setValue(this.AssignedScreenOrientationList);
  }
  FetchCustomField(): void {
    const obj = {
      id: this.route.snapshot.params.id
    };
    this.store.FetchCustomField(obj).subscribe((res) => {
      this.loader = false;
      this.fieldID = res.data.id;
      this.store.customFieldForm.patchValue({
        field_label: res.data.field_label,
        field_type: res.data.field_type,
        description: res.data.description,
        character_limit: res.data.character_limit,
        default_value: res.data.default_value,
        is_mandatory: res.data.is_mandatory,
        is_enabled: res.data.is_enabled,
        is_searchable: res.data.is_searchable,
        assigned_screens: res.data.assigned_screens,
      });
      // this.store.customFieldForm.value.assigned_screens
      this.store.screens.forEach((element, i) => {
        const index = (this.store.customFieldForm.value.assigned_screens).findIndex(it =>
          it.screen_key === element.id);
        index !== -1 ? this.store.screens[i].assign = true : '';
        index !== -1 ? this.addToAssignedScreens(this.store.screens[i].id) : '';
      });
      this.customField = res.data;
    }, (error) => {
      this.loader = false;

    });
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
