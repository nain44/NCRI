import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { TeamService } from '../services/user-teams.service';
import {GlobalService} from '../../../../core/services/global.service'
@Component({
  selector: 'ncri-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  MANY_ITEMS = 'MANY_ITEMS';
  userList2 = [];
  many2=["Please drag and drop a user from the list or select from the list"]
  selectedClientList:any=[];
  subs = new Subscription();
  userList: any = [];
  userLoader = false;
  roleLoader = false;
  gradeForm: FormGroup;
  responseText: any = [];
  modalRef: BsModalRef;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  loader = false;
  newGradeID: any;
  gradeAvailable = '';
  
  searchUsersText = '';
  clientList: any;
  teamForm: FormGroup;
  usr :any={};
  clientObj:any={};
  clientObjE:any={};
  teamLoader:any
  searchSelectedUserText: string = "";
  IsTeamLeadCheck: boolean;
  userList3: any=[];
  errMsg: boolean=false;
  showEditClient:boolean=false;
  productList:any=[];
  productListE:any=[];
  errors: any=[];
  loaderC: boolean=false;
  constructor(
    private service: TeamService,
    private dragulaService: DragulaService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    public global:GlobalService,
    
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      client_id: ['', Validators.required],
      client_name: ['', Validators.required],
      client_product: ['', Validators.required],
      check:[""],

    });
   
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserDropdownList();
    this.getClientDemographicDropdownList();
    
  }
  get Date(): Date {
    return new Date();
  }
  addToList(){
    
    this.subs.add(this.dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
             })
    );
}
removeFromList(){
  
  this.subs.add(this.dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
              
      })
    );
}

selectValues(value:any){
  
  this.clientObj.client_id=value;
  this.clientObj.client_name=value;
  // this.teamForm.controls.product_list.setValue(value);
  let index = this.clientList.findIndex(it => it.id === value);
  if(index >= 0){
    // this.teamForm.controls.product_list.setValue([this.clientList[index].product]);
    let obj = {
      id:value,
      name:this.clientList[index].product
    }
    this.productList = [obj];
  }
  
}
addClient() {
  
  let data = this.clientList.find(it => it.id === this.clientObj.client_id);
  let index = this.selectedClientList.findIndex(it => it.id === this.clientObj.client_name);
  if(data && index === -1){
    let obj = {
      code: data.client_number,
      name: data.company_name,
      product: [data.product],
      id: data.id
    }
    this.selectedClientList.unshift(obj);

    this.clientObj={};

  }
 
}
showEdit(obj:any,indx){
  
  this.clientObj={};
  this.showEditClient=true;
  this.clientObjE.client_idE=obj.id;
  this.clientObjE.client_nameE=obj.id;
  this.clientObjE.client_productE=obj.product;
  this.clientObjE.index1=indx;
}
selectValuesE(value:any){
  
  this.clientObjE.client_idE=value;
  this.clientObjE.client_nameE=value;
  // this.teamForm.controls.product_list.setValue(value);
  let index = this.clientList.findIndex(it => it.id === value);
  if(index >= 0){
    // this.teamForm.controls.product_list.setValue([this.clientList[index].product]);
    let obj = {
      id:value,
      name:this.clientList[index].product
    }
    this.productListE = [obj];
  }
 // this.clientObjE={};
}

 updateClient(objUpdate:any, indx){
 
    
   
  //========================

  let data = this.clientList.find(it => it.id === this.clientObjE.client_idE);
   
  this.selectedClientList[indx].id=data.id;
  this.selectedClientList[indx].code=data.client_number;
  this.selectedClientList[indx].name=data.company_name;
  this.selectedClientList[indx].product=data.product;
  this.clientObjE={};
    this.clientObj={};
    console.log("this.selectedClientList====",this.selectedClientList);
  
  //======================
}

  removeClient(obj:any){
  this.selectedClientList = this.selectedClientList.filter(item => item !== obj);
 }
  checkBx(usr){
  
  this.userList2.push(usr)
  this.userList.map(it => it.check = false);
  this.userList2.map(it=>it.isTeamLead=false)

  console.log(this.userList2)
  this.removeBx(usr)
     }
  removeBx(usr){
      this.userList = this.userList.filter(item => item !== usr);
      
    }
  showbtn(){
      let check = this.userList2.some(it => it.check === true)
      return check;
    }
  checkBx2(usr2){
      this.userList2 = this.userList2.filter(item => item !== usr2);
      this.userList2.unshift(usr2)
      this.userList2.some(it => it.check = true)
      this.userList2.some(it => it.isTeamLead = true)
      this.showbtn();
      
        }
  addBack(usr2){
          this.userList.unshift(usr2)
          this.userList.map(it => it.check = false);
          
            }
        removeBx2(usr2){
          this.userList2 = this.userList2.filter(item => item !== usr2);
          this.addBack(usr2)
        }
 addTeam(obj)
        {
          this.loaderC=true;
          this.errors=[];  
 
          let form = Object.assign({}, this.clientObj);      
          form.team_client_demographics = this.selectedClientList.map(it => ({client_demographic_id:it.id,product_list:[it.product]}))      
          let userList3:any[]= this.userList2.map(it => ({user_id:it.id,is_team_lead:it.isTeamLead})) 
          let param = {
            
              "name":this.teamForm.value.name,
              "team_users":userList3,
              "team_client_demographics": form.team_client_demographics
          }
          
          this.service.AddTeam(param).subscribe((res) => {
            if (res.status === 'success') {
              this.loaderC=false;
              if(this.errors.length==0){
              this.global.setCustomFieldAddTeaser('Team Added Successfuly');
              this.router.navigate(['/user-teams']);
              }
            }
            if(res.message=="An item already exists in the DB with this identity."){
              
              this.errors.push(res.message);
              
              
              console.log(this.errors)
              this.openErrorModal()
           
           // debugger
          }
          if(res.errors){
            this.loaderC=false;
          this.errors=res.errors.name; 
          if(this.errors.length!=0)
          {
              this.openErrorModal();
          }
        }
        this.loaderC=false;
      }, (error) => {
            this.openErrorModal()
            this.loaderC=false;
           
          });
        }

  
  
  getUserDropdownList(): void {
    this.loader = true;
    this.service.UserDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.userList = res.data;
        this.userList.map(it => it.check = false);
      }
      this.loader = false;
    }, (error) => {
      this.loader = false;
    });
  }
  errMsgFunc(){
    this.errMsg=false;
  }
  getClientDemographicDropdownList(): void {
    
    this.userLoader = true;
   
    this.service.ClientDemographicDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.clientList = res.data;
        
      }
      this.userLoader = false;
    }, (error) => {
      this.userLoader = false;
    });
  }

////////////////// Pop Region//////////////////////
  openErrorModal(): void {
    debugger
    this.modalRef = this.modalService.show(this.errorModal);
  }
  
  openDeleteclient(deleteclient: TemplateRef<any>,data) {
    // this.userData = data
    this.modalRef = this.modalService.show(deleteclient);
    // this.modalRef.content.userActivate = 'Close';
  }
////////////////End pop Region//////////////////
}

