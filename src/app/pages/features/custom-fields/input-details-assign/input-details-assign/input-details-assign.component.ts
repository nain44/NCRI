import { GlobalService } from './../../../../../core/services/global.service';
import { Router } from '@angular/router';
import { StoreService } from './../../service/store.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ncri-input-details-assign',
  templateUrl: './input-details-assign.component.html',
  styleUrls: ['./input-details-assign.component.scss']
})
export class InputDetailsAssignComponent implements OnInit {

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
  screens = [];
  selectedScreen: string;
  loader = false;
  AssignedScreenOrientation: any;
  AssignedScreenOrientationList = [];
  searchValue: string = "";
  @ViewChild('load') loaderModal: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    public store: StoreService,
    private router: Router,
    private global: GlobalService
  ) {
    this.store.customFieldForm.controls.field_label.status === 'INVALID' ?
      this.router.navigate(['/custom-fields/input-details']) : '';
  }

  ngOnInit(): void {
  }
  addToAssignedScreens(screenID): void {
    const screenOrientationKey = this.AssignedScreenOrientationList.findIndex(it => it.screen_key === screenID);
    const screenKey = this.screens.findIndex(it => it.screen_key === screenID);
    screenKey !== -1 ? this.screens.splice(screenKey, 1) : this.screens.push({ screen_key: screenID });
    this.store.customFieldForm.controls.assigned_screens.setValue(this.screens);
    screenOrientationKey !== -1 && screenKey !== -1 ? this.AssignedScreenOrientationList.splice(screenOrientationKey, 1) : '';
    this.store.customFieldForm.controls.assigned_screen_orientations.setValue(this.AssignedScreenOrientationList);
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
  AddCustomField(): void {
    this.modalRef = this.modalService.show(this.loaderModal, this.configs);
    this.store.AddCustomField().subscribe((res) => {
      this.loader = false;
      debugger;
      this.modalRef.hide();

      this.router.navigate(['/custom-fields']);
      this.global.setCustomFieldAddTeaser('Input text Field');
    }, (error) => {
      debugger;
      this.loader = false;
      this.modalRef.hide();

    });
  }
  openPreviewFields(preview: TemplateRef<any>, screen: any): void {
    debugger;
    this.selectedScreen = screen;
    const obj = {
      screen_key: screen.id
    };
    this.store.FetchAssignedScreenOrientation(obj).subscribe((res) => {
      this.loader = false;
      debugger;
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
        const mapKey = (this.store.customFieldForm.value.field_label).replaceAll(' ', '_');
        const newField = {
          map_key: mapKey,
          value: this.store.customFieldForm.value.field_label,
          display_name: this.store.customFieldForm.value.field_label,
          required: this.store.customFieldForm.value.is_mandatory,
          input_type: this.store.customFieldForm.value.field_type,
        };
        this.AssignedScreenOrientation.form_json.form.push(newField);
      }
      this.modalRef = this.modalService.show(preview, this.configs);
    }, (error) => {
      debugger;
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
  openUploadRecode(uploadRecord: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(uploadRecord, this.config);
    // this.modalRef.content.uploadRecord = 'Close';
  }

}
