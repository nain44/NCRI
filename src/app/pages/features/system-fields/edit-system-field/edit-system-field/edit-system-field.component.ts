import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-bootstrap/positioning/models';
import { SystemFieldService } from '../../service';

@Component({
  selector: 'ncri-edit-system-field',
  templateUrl: './edit-system-field.component.html',
  styleUrls: ['./edit-system-field.component.scss']
})
export class EditSystemFieldComponent implements OnInit {
  systemFieldID: string = "";
  dropdownList: any = [];
  systemFieldDetails: any = {};
  showRecords: boolean = false;

  customFieldID: string = "";
  customFieldDetails: any = {};
  @ViewChild('uploadRecord') uploadRecord: TemplateRef<any>;
  @ViewChild('load') loaderModal: TemplateRef<any>;
  public defaultValue: Array<Select2OptionData>;
  public options: Options;
  public value: string[];
  public placeholder = 'placeholder';
  selectedStatusFilter = 'ALL';

  // end
  modalRef: BsModalRef;
  @ViewChild('preview') preview: TemplateRef<any>;
  screens = [
    {
      key: 'cmg_custom_fields',
      label: 'Client Management - Custom Fields',
      assign: false,
      form:[

      ]

    },
    {
      key: 'cmg_custom_fields_demo',
      label: 'Client Management - Custom Fields Demo',
      assign: false,
      form:[

      ]

    },
  ];
  selectedScreen: { key: string; label: string; assign: boolean; form: any[]; };
  loader: boolean = false;
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
  fileList: any = [];
  defaultval: string = "";
  @ViewChild('select') defaultDropdown: ElementRef<any>
  copyDropdownList: any = [];
  openEditView: boolean = false;
  @ViewChild('customValues') customValues: ElementRef<any>
  aliasData: any[] = [];
  aliasColumns: string[] = [];
  copyAliasColumns: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SystemFieldService,
    private modalService: BsModalService,
  ) { 
    this.systemFieldID = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.fetchSystemField();
  }
// select2 change value
  public valueChanged(event: string) {
    alert('value changed: ' + event);
  }

  public modelChanged(event: string) {
    alert('model changed: ' + event);
  }
// select2 change value end
  
  fetchSystemField(){
    
    let obj = {
      id: this.systemFieldID
    }
    this.service.fetchSystemField(obj).subscribe((res) =>{
      if(res.status === "success"){
        
        this.systemFieldDetails = res.data;
        this.fetchDropdownValues(this.systemFieldDetails.fetch_api_url);
      }
    },(error) =>{

    })
  }

  fetchDropdownValues(url:any){
    this.service.fetchDropdownValues(url).subscribe((res) =>{
      if(res.status === "success"){
        
        // for(var i = 0; i<res.data.length; i++){
        //   // res.data[i].item_index = (i+1);
        //   res.data[i].isDefault = true;
        //   res.data[i].alias_array = res.data[i].alias_array
        //    ? JSON.parse(res.data[i].alias_array) : [];
        //    res.data[i].alias_map = res.data[i].alias_array ? res.data[i].alias_array.toString() : "";
        //   //changing alias_map with new functionality
        //   //    //converting alias array in columns
        //   //  for(var j =0; j<res.data[i].alias_array.length; j++){
        //   //     let key = ('Alias'+ (j ? ('_'+(j+1)) : ''));
        //   //     res.data[i][key] = res.data[i].alias_array[j];
        //   //  }

        // }
        
        //new functionality 
        let lengthCount = 0;
        res.data.map(it => {
          it.isDefault = true;
          it.alias_array = it.alias_array
           ? JSON.parse(it.alias_array) : [];
           //  res.data[i].alias_map = res.data[i].alias_array ? res.data[i].alias_array.toString() : "";
           

           //converting alias array in columns
           
           if(it.alias_array.length > lengthCount){
             lengthCount = it.alias_array.length;
           }
          //  for(var i =0; i<it.alias_array.length; i++){
             
          //     // let key = ('Alias'+ (i ? ('_'+(i+1)) : ''));
          //     // it[key] = it.alias_array[i];
          //  }
        });

        this.createAliasArray(res.data, lengthCount);

        // debugger
        // this.aliasData = [];
        // res.data.map(it =>{
        //   let obj = {};
        //   for(var i = 0; i<lengthCount; i++){
        //     let key = 'Alias' +(i ? ('_'+(i+1)) : '');
        //     if(it.alias_array[i]){
        //       obj[key] = it.alias_array[i]
        //     }else{
        //       obj[key] = "";
        //     }
        //   }

        //   obj['Field_Name'] = it.name;
        //   obj['is_active'] = it.is_active;
        //   obj['item_index'] = it.item_index;
        //   obj['id'] = it.id;

        //   this.aliasData.push(obj);

        // });

        // this.aliasColumns = Object.keys(this.aliasData[0]).filter(it => it.toLowerCase().includes('alias'));

        
        this.dropdownList = res.data;
        this.dropdownList = this.dropdownList.sort((a, b) => parseFloat(a.item_index) - parseFloat(b.item_index));
        this.copyDropdownList = this.dropdownList.map(object => {
          object = ({ ...object })
          object.alias_temp = object.alias_temp.map(x => ({...x}));
          return object
        });
        // this.dropdownList.sort((a, b) => a.item_index.localeCompare(b.item_index));
        
        // .
        // let temparray = [...this.dropdownList]
      }
    },(error) =>{

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
 

  openUploadRecode() { 
    this.modalRef = this.modalService.show(this.uploadRecord, this.config);
    // this.modalRef.content.uploadRecord = 'Close'; 
  }

  openPreviewFields(preview){

  }

  toggleVisibility(index:number){
    this.dropdownList[index].is_active = !this.dropdownList[index].is_active;
  }

  deleteDropdownValue(index:number){
    this.dropdownList[index].is_delete = true;
  }

  openFileUploader(){
    if(this.fileList.length === 0){
      document.getElementById('txtFile').click()
    }
  }

  dropFile(event:any){
    if(this.fileList.length === 0){
      this.uploadedFile(event,'drop');
    }
    
  }

  uploadedFile($event,type?:any){
    let file;
    if(type === 'drop'){
      file = $event[0];
    }else{
      if($event.currentTarget.files.length > 0){
         file = $event.currentTarget.files[0];
      }
    }
    if(file){
      let list = file.name.split(".");
      let type = list[list.length - 1];
      if(type.trim() === 'csv') {
        let obj = {name:file.name};
        this.fileList.push(obj);
        var reader = new FileReader();
        reader.onload =  () => {
          let res = this.converDataToJSON(reader.result);
          console.log(res);
          this.dropdownList = [...this.dropdownList,...res];
          let lengthCount = 0;
          this.dropdownList.map(it =>{
            if(it.alias_array.length > lengthCount){
              lengthCount = it.alias_array.length
            }
          })
          this.createAliasArray(this.dropdownList, lengthCount);
          this.defaultValue = this.dropdownList.map(object => ({ ...object }));
          this.copyDropdownList = this.dropdownList.map(object => {
            object = ({ ...object })
            object.alias_temp = object.alias_temp.map(x => ({...x}));
            return object
          });
          document.getElementById("txtFile")['value'] = "";
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(file);
      }else{
        alert("Only csv files allowed to be uploaded.");
      }

    }
  }

  converDataToJSON(csv){
    var lines=csv.split("\n");

    var result = [];
  
    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step 
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers=lines[0].split(",");
    let index = this.dropdownList.length;
    for(var i=0;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<1;j++){
            obj['text'] = currentline[j].trim();
            obj['name'] = currentline[j].trim();
            obj['id'] = "";
            obj['item_index'] = index;
            obj['alias_array'] = this.getAlias(currentline);
            obj['alias_map'] = obj['alias_array'].toString();
            obj['is_active'] = true;
            obj['is_delete'] = false;
            index++
        }
        
        if(obj['text']){
          result.push(obj);
        }
    }
  
    //return result; //JavaScript object
    return result //JSON
  }

  cancelField(){
    this.aliasColumns = [...this.copyAliasColumns];
    // this.dropdownList = this.copyDropdownList.map(object => ({...object}));
    this.dropdownList = this.copyDropdownList.map(object => {
      object = ({ ...object })
      object.alias_temp = object.alias_temp.map(x => ({ ...x }));
      return object
    });
    this.showRecords = false;
  }

  getAlias(line:any){
    line.splice(0,1);
    return line.slice(0,5);
  }

  //new methods 
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

  saveDropdownValues() {
    this.showRecords = false;
    this.copyAliasColumns = [...this.aliasColumns];
    this.dropdownList.map(it => {
      let values = it.alias_temp.map(it => it.name).filter(it => it);
      it.alias_array = values;
    })

    for (let index = 0; index < this.dropdownList.length; index++) {
      this.dropdownList[index].item_index = index + 1;

    }

    this.copyDropdownList = this.dropdownList.map(object => {
      object = ({ ...object })
      object.alias_temp = object.alias_temp.map(x => ({ ...x }));
      return object
    });
    // this.modalRef.hide();
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
    debugger
    // this.dropdownList.map(it => {
    //   if(it.alias_array.length > 0){
    //     it.alias_map = it.alias_array.toString();
    //   }else{
    //     it.alias_map = "";
    //   }
    // })
  }

  deleteFile(index:number){
    this.fileList.splice(index, 1);

    this.dropdownList = this.copyDropdownList;
    this.defaultValue = [];
    setTimeout(() => {
      this.defaultValue = this.dropdownList;
    }, 100);
  }

  updateSystemField(){
    this.openLoaderModal();
    debugger
    // this.loader = true;
    // for(var i = 0; i<this.dropdownList.length; i++){
    //   this.dropdownList[i] getInterpolationArgsLength

      
    // }
    let obj = {
      items: this.dropdownList
    }
    let url = this.systemFieldDetails.update_api_url;
    this.service.updateSystemField(url,obj).subscribe((res) => {
      // this.loader = false;
      this.modalRef.hide();
      if(res.status === "success"){
        this.router.navigate(['/system-fields']);
      }
    },(error) =>{
      this.modalRef.hide();
      // this.loader = false;
    })
  }

  openEdit() {
    this.openEditView = !this.openEditView;
    if (!this.openEditView) {
      debugger
      let values = this.customValues.nativeElement.value.split(",");
      let arr = [];
      for (var i = 0; i < values.length; i++) {
        if (values[i].trim()) {
          let obj = {
            text: values[i].trim(),
            name: values[i].trim(),
            id: "",
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
}
