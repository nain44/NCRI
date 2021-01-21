import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { DragulaService } from 'ng2-dragula';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-bootstrap/positioning/models';
import { CustomFieldService, StoreService } from '../../service';

@Component({
  selector: 'ncri-edit-dropdown',
  templateUrl: './edit-dropdown.component.html',
  styleUrls: ['./edit-dropdown.component.scss']
})
export class EditDropdownComponent implements OnInit {
  customFieldID: string = "";
  customFieldDetails: any = {};
  showRecords: boolean = false;
  public defaultValue: Array<Select2OptionData>;
  public options: Options;
  public value: string[];
  @ViewChild('customValues') customValues: ElementRef<any>
  public placeholder = 'placeholder';
  selectedStatusFilter = 'ALL';
  searchValue: string = "";

  // end
  modalRef: BsModalRef;
  @ViewChild('preview') preview: TemplateRef<any>;
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
  @ViewChild('load') loaderModal: TemplateRef<any>;
  selectedScreen: { key: string; label: string; assign: boolean; form: any[]; };
  loader: boolean = false;
  @ViewChild('uploadRecord') uploadRecord: TemplateRef<any>;
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
  dropdownList: any = [];
  fileList: any = [];
  defaultval: string = "";
  @ViewChild('select') defaultDropdown: ElementRef<any>
  openEditView: boolean = false;
  copyAliasColumns: any[] = [];
  aliasColumns: any = [];
  constructor(
    private route: ActivatedRoute,
    private service: CustomFieldService,
    public store: StoreService,
    private modalService: BsModalService,
    public dragulaService: DragulaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customFieldID = this.route.snapshot.params.id;
    this.fetchCustomDetails();
  }

  fetchCustomDetails() {
    let obj = {
      id: this.customFieldID
    }
    this.service.fetchCustomField(obj).subscribe((res) => {
      if (res.status === "success") {
        this.customFieldDetails = res.data;
        this.store.customFieldForm.patchValue(res.data);
        let lengthCount = 0;
        res.data.options_array.map(it => {
          if(it.alias_array.length > lengthCount){
            lengthCount = it.alias_array.length;
          }
        });
        this.createAliasArray(res.data.options_array, lengthCount);
        this.dropdownList = res.data.options_array;
        // this.dropdownList = JSON.parse(res.data.options_array);
        this.defaultValue = this.dropdownList.filter(it => it.is_active === true).map(object => ({ ...object }));

        // this.store.dropdownList = this.dropdownList.map(object => ({...object}));
        this.store.dropdownList = this.dropdownList.map(object => {
          object = ({ ...object })
          object.alias_temp = object.alias_temp.map(x => ({...x}));
          return object
        });

        setTimeout(() => {
          let index = this.dropdownList.findIndex(it => it.text === res.data.default_value);
          if (index >= 0) {
            this.store.customFieldForm.controls.default_value.setValue(this.dropdownList[index].id);
          }
        }, 100);

        //assigning screens
        res.data.assigned_screens.map(screen => {
          let index = this.screens.findIndex(it => it.key === screen.screen_key);
          if (index >= 0) {
            this.screens[index].assign = true;
            this.addField(index);
          }
        })
      }
    }, (error) => {

    })
  }

  openUploadRecode() {
    this.modalRef = this.modalService.show(this.uploadRecord, this.config);
    // this.modalRef.content.uploadRecord = 'Close'; 
  }

  openFileUploader() {
    document.getElementById('txtFile').click()
  }

  dropFile(event: any) {
    this.uploadedFile(event, 'drop');
  }

  uploadedFile($event, type?: any) {
    let file;
    if (type === 'drop') {
      file = $event[0];
    } else {
      if ($event.currentTarget.files.length > 0) {
        file = $event.currentTarget.files[0];
      }
    }
    if (file) {
      let list = file.name.split(".");
      let type = list[list.length - 1];
      if (type.trim() === 'csv') {
        let obj = { name: file.name };
        this.store.fileList.push(obj);
        var reader = new FileReader();
        reader.onload = () => {
          let res = this.converDataToJSON(reader.result);
          console.log(res);
          this.dropdownList = [...this.dropdownList, ...res];
          let lengthCount = 0;
          this.dropdownList.map(it =>{
            if(it.alias_array.length > lengthCount){
              lengthCount = it.alias_array.length
            }
          })
          this.createAliasArray(this.dropdownList, lengthCount);
          this.defaultValue = this.dropdownList.map(object => ({ ...object }));
          // this.store.dropdownList = this.dropdownList.map(object => ({ ...object }));
          this.store.dropdownList = this.dropdownList.map(object => {
            object = ({ ...object })
            object.alias_temp = object.alias_temp.map(x => ({...x}));
            return object
          });

          document.getElementById("txtFile")['value'] = "";
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(file);
      } else {
        alert("Only csv files allowed to be uploaded.");
      }

    }
  }

  converDataToJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers = lines[0].split(",");
    let index = 0;
    for (var i = 0; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < 1; j++) {
        obj['text'] = currentline[j].trim();
        obj['name'] = currentline[j].trim();
        obj['id'] = (index + 1);
        obj['item_index'] = index;
        obj['alias_array'] = this.getAlias(currentline);
        obj['alias_map'] = obj['alias_array'].toString();
        obj['is_active'] = true;
        obj['is_delete'] = false;
        index++
      }

      if (obj['text']) {
        result.push(obj);
      }
    }

    //return result; //JavaScript object
    return result //JSON
  }

  deleteDropdownValue(index: number) {

    this.dropdownList.splice(index, 1);
    this.defaultValue = [];
    setTimeout(() => {
      this.defaultValue = this.dropdownList;
    }, 100);
  }



  deleteFile(index: number) {
    this.store.fileList.splice(index, 1);
    this.dropdownList = [];
    this.defaultValue = [];
  }

  toggleVisibility(index: number) {
    // let arr = [];
    this.dropdownList[index].is_active = !this.dropdownList[index].is_active;
    // if(this.dropdownList[index].is_active){
    //   arr = this.defaultValue;
    //   this.defaultValue = [];
    //   arr.splice(1, 0,this.dropdownList[index]);
    // }else{
    //   this.defaultValue.splice(index,1);
    //   arr = this.defaultValue;
    //   this.defaultValue = [];
    // }

    // setTimeout(() => {
    //   this.defaultValue = arr;
    // }, 100);
  }

  saveOrientation() {
    this.selectedScreen
    this.screens
    this.modalRef.hide();

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
            let obj = this.screens[index].form.find(it => it.display_name === this.store.customFieldForm.controls.field_label.value)
            if (obj) {
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

  updateCustomField() {
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
    body.id = this.customFieldID;
    // this.loader = true;
    this.openLoaderModal();
    this.service.updateCustomField(body).subscribe((res) => {
      // this.loader = false;
      if (res.status === "success") {
        this.modalRef.hide();
        this.router.navigateByUrl('/custom-fields/dashboard');
      }
    }, (error) => {
      this.modalRef.hide();
      this.loader = false;
    })

  }

  ngOnDestroy() {
    this.store.initCustomFieldForm();
    this.store.dropdownList = [];
  }

  valueChanged(id: any) {
    let obj = this.store.dropdownList.find(it => it.id === parseInt(id));
    if (obj) {
      return obj.text;
    } else {
      return "";
    }
  }

  openEdit() {
    this.openEditView = !this.openEditView;
    if (!this.openEditView) {
      let values = this.customValues.nativeElement.value.split(",");
      let arr = [];
      for (var i = 0; i < values.length; i++) {
        if (values[i].trim()) {
          let obj = {
            text: values[i].trim(),
            name: values[i].trim(),
            id: (i + 1),
            item_index: i,
            is_active: true,
            is_delete: false,
          }
          arr.push(obj);
        }

      }
      console.log(arr);

      this.dropdownList = [...arr];
      this.defaultValue = this.dropdownList.map(object => ({ ...object }));
      this.store.dropdownList = this.dropdownList;
    }else{
      let data = this.dropdownList.map(it => it.name).toString();
      setTimeout(() => {
        debugger
        this.customValues.nativeElement.value = data;
      }, 100);
    }
  }

  appendComma(){
    this.customValues.nativeElement.focus();
    let val = this.customValues.nativeElement.value+",";
    this.customValues.nativeElement.value = "";
    this.customValues.nativeElement.value = val;
    
  }

  openLoaderModal() {
    this.modalRef = this.modalService.show(this.loaderModal, this.config);
  }

  //new functionality
  // cancelField(){
  //   this.dropdownList = this.store.dropdownList.map(object => ({...object}));
  //   this.showRecords = false;
  // }
  
  getAlias(line:any){
    line.splice(0,1);
    return line.slice(0,5);
  }

  addAlias(row){
    if(row.alias_map){
      row.alias_array = row.alias_map.split(',').filter(it => it !== ""); 
    }else{
      row.alias_array = [];
    }
  }

  appendCommaToAlias(obj:any){
    obj.alias_map ? 
    obj.alias_map = obj.alias_map+"," : "";
  }

  openAliasPage(){
    this.showRecords = true;
    // this.dropdownList.map(it => {
    //   if(it.alias_array.length > 0){
    //     it.alias_map = it.alias_array.toString();
    //   }else{
    //     it.alias_map = "";
    //   }
    // })
  }

  //new logic for alias
  saveDropdownValues(){
    this.showRecords = false;
    this.copyAliasColumns = [...this.aliasColumns];
    this.dropdownList.map(it =>{
      let values = it.alias_temp.map(it => it.name).filter(it => it);
      it.alias_array = values;
    });

    
    this.dropdownList.map(it => it.text = it.name);

    // this.store.dropdownList = this.dropdownList.map(object => ({...object}));
    this.store.dropdownList = this.dropdownList.map(object => {
      object = ({ ...object })
      object.alias_temp = object.alias_temp.map(x => ({ ...x }));
      return object
    });
    this.defaultValue = [];
    let arr = this.dropdownList.filter(it => it.is_active === true);
    setTimeout(() => {
        this.defaultValue = arr;
    }, 100);
    // this.modalRef.hide();
  }

  cancelField(){
    this.aliasColumns = [...this.copyAliasColumns];
    // this.dropdownList = this.store.dropdownList.map(object => ({...object}));
    this.dropdownList = this.store.dropdownList.map(object => {
      object = ({ ...object })
      object.alias_temp = object.alias_temp.map(x => ({ ...x }));
      return object
    });
    this.showRecords = false;
  }

      //adding column for alias
      addNewColumn() {
        let colName = 'Alias ' + (this.aliasColumns.length + 1);
        this.aliasColumns.push(colName);
    
        //adding alias value in array
        this.dropdownList.map(it => {
          it.alias_temp.push({ name: "" });
        })
      }
      
    //removing alias column
    removeAliasColumn(index:any){
      //removing alias column
      this.aliasColumns.splice(index, 1);
  
      //removing alias value from array
      this.dropdownList.map(it => {
        if(it.alias_temp[index]){
          it.alias_temp.splice(index, 1);
        }
        
      })
    }

  createAliasArray(data:any, length:any){
    this.aliasColumns = [];
    for(var i = 0; i<length; i++){
      let val = 'Alias' + (i ? (' '+(i+1)) : "");
      this.aliasColumns.push(val);
    }

    this.copyAliasColumns = [...this.aliasColumns];
    
    data.map(it => {
      it.alias_temp = [];
      for (var i = 0; i < length; i++) {
        if (it.alias_array[i]) {
          it.alias_temp.push({ name: it.alias_array[i] });
        } else {
          it.alias_temp.push({ name: "" });
        }

      }
    })
  }

}
