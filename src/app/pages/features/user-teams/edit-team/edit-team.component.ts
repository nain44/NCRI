import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { TeamService } from '../../user-teams/services/user-teams.service';
import {GlobalService} from '../../../../core/services/global.service'
@Component({
  selector: 'ncri-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  MANY_ITEMS = 'MANY_ITEMS';
  userList2 = [];
  many2=["Please drag and drop a user from the list or select from the list"]
 
  editLoader:boolean=false;
  subs = new Subscription();
  roleList: any = [];
  userList: any = [];
  teamData:any={};
  userLoader = false;
  roleLoader = false;
  teamForm: FormGroup;
  clinetList: any;
  responseText: any = [];
  modalRef: BsModalRef;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  loader = false;
  newGradeID: any;
  gradeAvailable = '';
  searchRolesText = '';
  searchUsersText = '';
  sub: any;
  gradeID = '';
  clientObj:any={};
  clientObjE:any={};
  selectedClientList:any=[];
  showEditClient:boolean=false;
  demId:any;
  demName:any;
  productList:any=[];
  productListE:any=[];
  searchSelectedUserText: string = "";
  errors: any=[];
  constructor(
    private service: TeamService,
    private dragulaService: DragulaService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    public global:GlobalService,
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      client_id: ['', Validators.required],
      client_name: ['', Validators.required],
      client_product: ['', Validators.required],
      check:[""]
    });

    
     // fetching query param from route
     this.sub = this.route
     .queryParams
     .subscribe(params => {
       // Defaults to 0 if no query param provided.
     
       this.gradeID = params.id ? params.id : '';
       this.gradeID === '' ? this.router.navigate(['/user-teams']) : '';
     });
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchTeam();
    //this.getUserDropdownList();
    this.getClientDemographicDropdownList();
    
  }
  get Date(): Date {
    return new Date();
  }
  addToList(){
    debugger
    this.subs.add(this.dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
             })
    );
}
removeFromList(){
  debugger
  this.subs.add(this.dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
              
      })
    );
}
 

  checkBx(usr){
  debugger
  this.userList2.push(usr)
  this.userList.map(it => it.check = false);
  this.userList2.map(it=>it.isTeamLead=false)

  console.log(this.userList2)
  this.removeBx(usr)
     }
  removeBx(usr){
    debugger
      this.userList = this.userList.filter(item => item !== usr);
      
    }
  showbtn(){
      let check = this.userList2.some(it => it.check === true)
      return check;
    }
  checkBx2(usr2){
    debugger
      this.userList2 = this.userList2.filter(item => item !== usr2);
      this.userList2.unshift(usr2)
      this.userList2.some(it => it.check = true)
      this.userList2.some(it => it.isTeamLead = true)
      
        }
  addBack(usr2){
    debugger
          this.userList.unshift(usr2)
          this.userList.map(it => it.check = false);
          
            }
        removeBx2(usr2){
          this.userList2 = this.userList2.filter(item => item !== usr2);
          this.addBack(usr2)
        }
  ////////////////// Pop Region//////////////////////
  openErrorModal(): void {
    debugger
    this.modalRef = this.modalService.show(this.errorModal);
  }
  
  openDeleteclient(deleteclient: TemplateRef<any>,data) {
    debugger
    // this.userData = data
    this.modalRef = this.modalService.show(deleteclient);
    // this.modalRef.content.userActivate = 'Close';
  }
////////////////End pop Region//////////////////
  getUserDropdownList(): void {
    this.roleLoader = true;
    this.service.UserDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        debugger
        this.userList = res.data;
        this.userList.map(it => it.check = false);
        console.log('userList2==',this.userList2);
        console.log('userList==',this.userList);
        this.userList = this.userList.filter(item => this.userList2.every(f=>f.id!==item.id));
        console.log('newArr==',this.userList)

      }
      this.roleLoader = false;
    }, (error) => {
      this.roleLoader = false;
    });
  }
  
  getClientDemographicDropdownList(): void {
    
    this.userLoader = true;
   
    this.service.ClientDemographicDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.clinetList = res.data;
        
      }
      this.userLoader = false;
    }, (error) => {
      this.userLoader = false;
    });
  }

  fetchTeam(): void {
    
    this.userLoader = true;
    const obj = {
      id: this.gradeID
    };
    this.service.FetchTeam(obj).subscribe((res) => {
      if (res.status === 'success') {
    this.getUserDropdownList();
      
        this.teamData = res.data;
        this.clientObj.name=this.teamData.name;
        this.userList2=this.teamData.team_users.map(it=> ({
          first_name: it.user__first_name,
          last_name: it.user__last_name,
          id: it.user_id,
          isTeamLead: it.is_team_lead,
          check:false
        }));
          debugger
     let userL= this.userList2.filter(item => item.isTeamLead==true)[0];
     

     this.userList2 = this.userList2.filter(item => item!==userL);
     userL.check=true;
        this.userList2.unshift(userL)
        console.log('json data',JSON.parse(this.teamData.team_client_demographics[0].product_list) );
       if(this.teamData.team_client_demographics.length > 0){
        this.selectedClientList = this.teamData.team_client_demographics.map(it => ({
          code: it.client_demographic__client_number,
          name: it.client_demographic__company_name,
          product: JSON.parse(it.product_list) ? JSON.parse(it.product_list) : [],
          id: it.client_demographic_id
        }));
      }
       // this.teamForm.controls.name.setValue(this.userList.name);
        //this.userList.map(it => it.check = false);
      }
      this.userLoader = false;
    }, (error) => {
      this.userLoader = false;
    });
  }
  //-------------------------------------ncri code
  selectValues(value:any){
    debugger
    this.clientObj.client_id=value;
    this.clientObj.client_name=value;
    // this.teamForm.controls.product_list.setValue(value);
    let index = this.clinetList.findIndex(it => it.id === value);
    if(index >= 0){
      // this.teamForm.controls.product_list.setValue([this.clientList[index].product]);
      let obj = {
        id:value,
        name:this.clinetList[index].product
      }
      this.productList = [obj];
    }
    
  }
  addClient() {
    debugger;
    let data = this.clinetList.find(it => it.id === this.clientObj.client_id);
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
    
    // this.t.push(
    //   this.fb.group(
    //     {
    //       client_demographic_id: ['', Validators.required],
    //       product_list: ['', Validators.required]
    //     }
    //   )
    // )
  }
  //------------------------------------ncri code
  showEdit(obj:any,indx){
    debugger;
    this.clientObj={};
    this.showEditClient=true;
    this.clientObjE.client_idE=obj.id;
    this.clientObjE.client_nameE=obj.id;
    this.clientObjE.client_productE=obj.product;
    this.clientObjE.index1=indx;
  }
  selectValuesE(value:any){
    debugger
    this.clientObjE.client_idE=value;
    this.clientObjE.client_nameE=value;
    // this.teamForm.controls.product_list.setValue(value);
    let index = this.clinetList.findIndex(it => it.id === value);
    if(index >= 0){
      // this.teamForm.controls.product_list.setValue([this.clientList[index].product]);
      let obj = {
        id:value,
        name:this.clinetList[index].product
      }
      this.productListE = [obj];
    }
   // this.clientObjE={};
  }
  getClientInfo(event){
    debugger;
    this.demId=event.client_id.id;
    this.demName=event.client_id.client_number;

  }
  // addClients(obj:any){
  //   debugger
  //   this.selectedClientList.push({id:obj.client_id.id,code:obj.client_id.client_number,name:obj.client_name,product:obj.client_product})
  //   this.clientObj={};
  // }
  updateClient(objUpdate:any, indx){
 
    
   
    //========================
    debugger;
    let data = this.clinetList.find(it => it.id === this.clientObjE.client_idE);
     
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
   updateUserTeam()
    {
      // const obj = {
      //   id: this.gradeID ,
      //   name: this.clientObj.tName,
      //   team_users:[{user_id:'333',is_team_lead:"ffff"}],
      //   team_client_demographics:[{client_demographic_id:'hhhh',product_list:["dfdfsd","fasfsafs"]}]
      // }
      
      }
      submitForm(){
       
        this.errors=[];  
        this.editLoader = true;
        let form = Object.assign({}, this.clientObj);
        form.team_users = this.userList2.map(it => ({user_id: it.id, is_team_lead:(it.isTeamLead ? it.isTeamLead : false)}));
    
        form.team_client_demographics = this.selectedClientList.map(it => ({client_demographic_id:it.id,product_list:it.product}));
    
        form.id = this.gradeID;
        
        this.service.EditTeam(form).subscribe((res) =>{
          this.editLoader = false;
         

          if(res.status === "success"){
           let str ='Team Updated Successful';
            if(this.errors.length==0){
              this.global.setCustomFieldAddTeaser2(str,"User Team"+' '+this.clientObj.name+"  updated Successfuly");             // this.global.setCustomFieldAddTeaser('Team' +' '+ this.clientObj);
              this.router.navigate(['/user-teams']);
              }
          }else{
            this.responseText = res.message;
            this.openErrorModal();
          }
         },(error) =>{
          this.editLoader = false;
        })
      }
    
  
  assignGradeToUser(obj: any): void {
    // this.service.assignGradeToUser(obj).subscribe((res) => {
    //   if (res.status === 'success') {
    //     let obj = {
    //       user_grade_id: this.newGradeID,
    //       user_role_ids: this.roleList.filter(it => it.check === true).map(it => it.id)
    //     };
    //     this.assignGradeToRole(obj);
    //   } else {
    //     this.loader = false;
    //     if (res.errors) {
    //       const list = [];
    //       for (var key in res.errors) {
    //         let error = { name: key, list: res.errors[key].toString() };
    //         list.push(error);
    //       }
    //       this.responseText = list;
    //     } else {
    //       this.responseText = [{ name: 'Error', list: res.code }];
    //     }
    //     this.openErrorModal();
    //   }

    // }, (error) => {
    //   this.loader = false;
    //   this.openErrorModal();
    //   this.responseText = [{ name: 'Error', list: error.message }];
    // });
  }

  assignGradeToRole(obj: any): void {
    // this.service.assignGradeToRole(obj).subscribe((res) => {
    //   if (res.status === 'success') {
    //     this.loader = false;
    //     this.router.navigate(['/grade']);
    //   } else {
    //     this.loader = false;
    //     if (res.errors) {
    //       const list = [];
    //       for (var key in res.errors) {
    //         let error = { name: key, list: res.errors[key].toString() };
    //         list.push(error);
    //       }
    //       this.responseText = list;
    //     } else {
    //       this.responseText = [{ name: 'Error', list: res.code }];
    //     }
    //     this.openErrorModal();
    //   }
    // }, (error) => {
    //   this.loader = false;
    //   this.openErrorModal();
    //   this.responseText = [{ name: 'Error', list: error.message }];
    // });
  }
  redirectToList(): void {
    this.router.navigate(['/grade']);
  }

  addGrade(obj: any): void {
    this.loader = true;
    // this.service.addGrade(obj).subscribe((res) => {
    //   if (res.status === 'success') {
    //     this.newGradeID = res.data.id;
    //     const obj = {
    //       user_grade_id: this.newGradeID,
    //       user_ids: this.userList.filter(it => it.check === true).map(it => it.id)
    //     };
    //     this.redirectToList();
    //   } else {
    //     this.loader = false;
    //     if (res.errors) {
    //       let list = [];
    //       for (var key in res.errors) {
    //         let error = { name: key, list: res.errors[key].toString() };
    //         list.push(error);
    //       }
    //       this.responseText = list;
    //     } else {
    //       this.responseText = [{ name: 'Error', list: res.code }];
    //     }
    //     this.openErrorModal();
    //   }

    // }, (error) => {
    //   this.loader = false;
    //   this.openErrorModal();
    //   this.responseText = [{ name: 'Error', list: error.message }];
    // });
  }

  // submitForm(): void {
  //   const roleCheck = this.roleList.some(it => it.check === true);
  //   const userCheck = this.userList.some(it => it.check === true);
  //   if (roleCheck === false) {
  //     this.responseText = [{ name: 'Error: ', list: 'Please select at least one role to create grade.' }];
  //     this.openErrorModal();
  //     return;
  //   } else if (userCheck === false) {
  //     this.responseText = [{ name: 'Error: ', list: 'Please select at least one user to create grade.' }];
  //     this.openErrorModal();
  //     return;
  //   }
  //   const obj = {
  //     name: this.teamForm.get('name').value,
  //     description: this.teamForm.get('description').value,
  //     user_role_ids: this.roleList.filter(it => it.check === true).map(it => it.id),
  //     user_ids: this.userList.filter(it => it.check === true).map(it => it.id)
  //   };

  //   this.addGrade(obj);
  // }

  isGradeAvailable(): void {
    this.gradeAvailable = '';
    // this.service.isGradeAvailable({ name: this.gradeForm.controls.name.value }).subscribe((res) => {
    //   if (res.status === 'success') {
    //     if (res.data.is_available === false) {
    //       this.gradeAvailable = 'Grade name already taken.';
    //     }
    //   }
    // }, (error) => {
    //   this.gradeAvailable = '';
    // });
  }

}
