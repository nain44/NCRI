import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Select2OptionData } from 'ng-select2';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Options } from 'select2';
import { StoreService } from '../../service/store.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'ncri-dropdown-details',
  templateUrl: './dropdown-details.component.html',
  styleUrls: ['./dropdown-details.component.scss']
})
export class DropdownDetailsComponent implements OnInit {
  // select2
  public defaultValue:any = [];
  public options: Options;
  public value: string[];
  showRecords: boolean = false;
  public placeholder = 'placeholder';
  selectedStatusFilter = 'ALL';

  // end
  modalRef: BsModalRef;

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
  @ViewChild('select') defaultDropdown: ElementRef<any>
  @ViewChild('customValues') customValues: ElementRef<any>
  openEditView: boolean = false;
  aliasColumns: any[] = [];
  copyAliasColumns: any[] = [];
  constructor(
    private modalService: BsModalService,
    public store: StoreService,
    public dragulaService: DragulaService
  ) { }

  ngOnInit(): void {

    if(!this.store.customFieldForm.controls.character_limit.value){
      this.store.customFieldForm.controls.character_limit.setValue("0");
    }



    //registering dragula
    // this.dragulaService.createGroup("dropdown", {
    //   // ...
    // });

    this.dragulaService.dropModel("dropdown").subscribe(args => {
      console.log(args);
      this.dropdownList = args.targetModel;
      setTimeout(() => {
        this.defaultValue = args.targetModel;
      }, 100);
      this.store.dropdownList = args.targetModel;
    });


    this.store.customFieldForm.controls.field_type.setValue("SLS");
    // select2 
    this.options = {
      multiple: false,
      minimumResultsForSearch: -1,
      theme: "custom-select",  
      // placeholder: 'Default Value (Optional)',
    };
    // end

    //finding if data is available in store to fill current dropdown values
    if (this.store.dropdownList.length > 0) {
      this.dropdownList = this.store.dropdownList.map(object => ({ ...object }));
      this.defaultValue = this.store.dropdownList.filter(it => it.is_active === true).map(object => ({...object}));
    }
  }
  // public modelChanged(event: string) {
  //   console.log('model changed: ' + event);
  // }
  public modelChanged(event: string) {
    console.log('model changed: ' + event);
  }
  openUploadRecode() {
    this.modalRef = this.modalService.show(this.uploadRecord, this.config);
    // this.modalRef.content.uploadRecord = 'Close'; 
  }

  openFileUploader() {
    if (this.store.fileList.length === 0) {
      document.getElementById('txtFile').click()
    }

  }

  dropFile(event: any) {
    if (this.store.fileList.length === 0) {
      this.uploadedFile(event, 'drop');
    }

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
    debugger
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
    debugger
    this.dropdownList.splice(index, 1);
    this.defaultValue = [];
    setTimeout(() => {
      this.defaultValue = this.dropdownList;
    }, 100);
    this.defaultDropdown
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

  saveDropdownValues(){
    this.showRecords = false;
    this.copyAliasColumns = [...this.aliasColumns];
    // this.dropdownList.map(it =>{
    //   this.addAlias(it);
    // })
    this.dropdownList.map(it => {
      let values = it.alias_temp.map(it => it.name).filter(it => it);
      it.alias_array = values;
    })
    
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

  //new alias logic
    //adding column for alias
    addNewColumn() {
      let colName = 'Alias ' + (this.aliasColumns.length + 1);
      this.aliasColumns.push(colName);
      this.store.dropdownList
      //adding alias value in array
      this.dropdownList.map(it => {
        it.alias_temp.push({ name: "" });
      })
    }
    
  //removing alias column
  removeAliasColumn(index: any) {
    //removing alias column
    this.aliasColumns.splice(index, 1);

    //removing alias value from array
    this.dropdownList.map(it => {
      if (it.alias_temp[index]) {
        it.alias_temp.splice(index, 1);
      }

    })
  }

  cancelField() {
    this.aliasColumns = [...this.copyAliasColumns];
    this.dropdownList
    // this.dropdownList = this.store.dropdownList.map(object => ({ ...object }));
    this.dropdownList = this.store.dropdownList.map(object => {
      object = ({ ...object })
      object.alias_temp = object.alias_temp.map(x => ({ ...x }));
      return object
    });
    this.showRecords = false;
  }

  createAliasArray(data: any, length: any) {
    this.aliasColumns = [];
    for (var i = 0; i < length; i++) {
      let val = 'Alias' + (i ? (' ' + (i + 1)) : "");
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
