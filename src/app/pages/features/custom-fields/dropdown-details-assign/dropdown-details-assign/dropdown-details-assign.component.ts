import { GlobalService } from './../../../../../core/services/global.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StoreService } from '../../service/store.service';
import { CustomFieldService } from '../../service';
import { DragulaService } from 'ng2-dragula';
import { Router } from '@angular/router';

@Component({
  selector: 'ncri-dropdown-details-assign',
  templateUrl: './dropdown-details-assign.component.html',
  styleUrls: ['./dropdown-details-assign.component.scss']
})
export class DropdownDetailsAssignComponent implements OnInit {
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
  @ViewChild('uploadRecord') uploadRecord: TemplateRef<any>;
  @ViewChild('preview') preview: TemplateRef<any>;
  @ViewChild('load') loaderModal: TemplateRef<any>;
  searchValue: string = "";
  screens = [
    {
      key: 'cmg_custom_fields',
      label: 'Client Management - Custom Fields',
      assign: false,
      form: [

      ]

    },
    {
      key: 'cmg_custom_fields_demo',
      label: 'Client Management - Custom Fields Demo',
      assign: false,
      form: [

      ]

    },
  ];
  selectedScreen: { key: string; label: string; assign: boolean; form: any[]; };
  loader: boolean = false;
  constructor(
    private modalService: BsModalService,
    public store: StoreService,
    private service: CustomFieldService,
    private dragulaService: DragulaService,
    private router: Router,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    // this.dragulaService.dropModel("fields").subscribe(args => {
    //   this.selectedScreen.form = args.targetModel;
    // });
  }

  addField(index: any) {
    if (this.screens[index].assign) {
      let obj =
      {
        "map_key": this.store.customFieldForm.controls.field_label.value.replaceAll(" ", "_").toLowerCase(),
        "default_value": this.store.customFieldForm.controls.default_value.value,
        "display_name": this.store.customFieldForm.controls.field_label.value,
        "is_mandatory": this.store.customFieldForm.controls.is_mandatory.value,
        "input_type": "dropdown",
        "options": this.store.dropdownList
      }
      this.screens[index].form.push(obj);
      // let g = Object.assign({},obj);
      // g.map_key = "wasim"
      // this.screens[index].form.push(g);
    } else {
      let name = this.store.customFieldForm.controls.field_label.value.replaceAll(" ", "_").toLowerCase();
      let i = this.screens[index].form.findIndex(it => it.map_key === name);
      if (i >= 0) {
        this.screens[index].form.splice(i, 1);
      }
    }


  }

  openPreviewFields() {
    this.modalRef = this.modalService.show(this.preview, this.configs);
    // this.modalRef.content.preview = 'Close';
  }
  openUploadRecode(uploadRecord: TemplateRef<any>) {
    this.modalRef = this.modalService.show(uploadRecord, this.config);
    // this.modalRef.content.uploadRecord = 'Close';
  }

  openLoaderModal() {
    this.modalRef = this.modalService.show(this.loaderModal, this.config);
  }

  submitForm() {

  }

  fetchFieldsFromDB(index: any) {
    let obj = {
      screen_key: this.screens[index].key
    }
    this.service.getScreenOrientation(obj).subscribe((res) => {
      if (res.status === 'success') {
        if (res.data.length > 0) {
          let data = JSON.parse(res.data[0].form_json);
          if (this.screens[index].assign) {
            let obj = this.screens[index].form.find(it => it.display_name === this.store.customFieldForm.controls.field_label.value);
            let check = data.form.some(it => it.map_key.toLowerCase() === obj.map_key.toLowerCase())
            if (obj && check === false) {
              data.form.push(obj);
            }

          }
          this.screens[index].form = data.form;
        }

      }
      this.openPreviewFields();
      this.selectedScreen = this.screens[index];
    }, (error) => {
      this.openPreviewFields();
      this.selectedScreen = this.screens[index];
    })
  }

  addCustomField() {

    this.store.customFieldForm.controls.options_array.setValue(this.store.dropdownList);
    let arr = [];
    this.store.customFieldForm.controls.assigned_screens.setValue(
      this.screens.filter(it => it.assign === true).map(it => {
        let obj = { screen_key: it.key, form_json: it };
        arr.push(obj);
        return Object.assign({}, { screen_key: it.key })
      })
    );
    this.store.customFieldForm.controls.assigned_screen_orientations.setValue(arr);
    let body = Object.assign({}, this.store.customFieldForm.value);
    body.default_value = this.valueChanged(body.default_value);
    // this.loader = true;
    this.openLoaderModal();
    this.service.addCustomField(body).subscribe((res) => {
      // this.loader = false;
      if (res.status === "success") {
        this.modalRef.hide();
        this.global.setCustomFieldAddTeaser('Dropdown Text Field');
        this.router.navigateByUrl('/custom-fields/dashboard');
      }
    }, (error) => {
      this.modalRef.hide();
      // this.loader = false;
    })

  }

  saveOrientation() {
    this.selectedScreen
    this.screens
    this.modalRef.hide();

  }

  valueChanged(id: any) {
    let obj = this.store.dropdownList.find(it => it.id === parseInt(id));
    if (obj) {
      return obj.text;
    } else {
      return "";
    }
  }
}
