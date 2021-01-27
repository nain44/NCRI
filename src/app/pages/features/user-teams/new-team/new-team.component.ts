import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { TeamService } from '../services/user-teams.service';

@Component({
  selector: 'ncri-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  MANY_ITEMS = 'MANY_ITEMS';
  userList2 = [];
  many2=["Please drag and drop a user from the list or select from the list"]

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
  searchRolesText = '';
  searchUsersText = '';
  clinetList: any;
  teamForm: FormGroup;
  usr :any={};
  clientObj:any={
  }
  constructor(
    private service: TeamService,
    private dragulaService: DragulaService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      client_id: ['', Validators.required],
      client_name: ['', Validators.required],
      client_product: ['', Validators.required],
      check:[""]
    });
   
    
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserDropdownList();
    this.getClientDemographicDropdownList();
  }
  addToList(){
    
    this.subs.add(this.dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        debugger
        console.log('dropModel:');
        console.log(el);
        console.log(source);
        console.log(target);
        console.log(sourceModel);
        console.log(targetModel);
        console.log(item);
        console.log("userlist",this.userList2)
      })
    );
}
removeFromList(){
  debugger
  this.subs.add(this.dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
        
        console.log('removeModel:');
        console.log(el);
        console.log(source);
        console.log(sourceModel);
        console.log(item);
        
      })
    );
}



checkBx(usr){
  this.userList2.push(usr)
  this.userList.map(it => it.check = false);
  console.log(this.userList2)
  this.removeBx(usr)
     }
    removeBx(usr){
      this.userList = this.userList.filter(item => item !== usr);
      
    }
    checkBx2(usr2){
      this.userList2 = this.userList2.filter(item => item !== usr2);
      this.userList2.unshift(usr2)
      console.log(this.userList)
        }
        addBack(usr2){
          this.userList.unshift(usr2)
          this.userList.map(it => it.check = false);
          console.log(this.userList)
            }
        removeBx2(usr2){
          this.userList2 = this.userList2.filter(item => item !== usr2);
          this.addBack(usr2)
        }
  openErrorModal(): void {
    this.modalRef = this.modalService.show(this.errorModal);
  }
  
  openDeleteclient(deleteclient: TemplateRef<any>,data) {
    // this.userData = data
    this.modalRef = this.modalService.show(deleteclient);
    // this.modalRef.content.userActivate = 'Close';
  }

  getUserDropdownList(): void {
    this.roleLoader = true;
    this.service.UserDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.userList = res.data;
        this.userList.map(it => it.check = false);
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

  submitForm(): void {
    const roleCheck = this.userList.some(it => it.check === true);
    const userCheck = this.userList.some(it => it.check === true);
    if (roleCheck === false) {
      this.responseText = [{ name: 'Error: ', list: 'Please select at least one role to create grade.' }];
      this.openErrorModal();
      return;
    } else if (userCheck === false) {
      this.responseText = [{ name: 'Error: ', list: 'Please select at least one user to create grade.' }];
      this.openErrorModal();
      return;
    }
    const obj = {
      name: this.gradeForm.get('name').value,
      description: this.gradeForm.get('description').value,
      user_role_ids: this.userList.filter(it => it.check === true).map(it => it.id),
      user_ids: this.userList.filter(it => it.check === true).map(it => it.id)
    };

    this.addGrade(obj);
  }

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

