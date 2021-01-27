import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { TeamService } from '../../user-teams/services/user-teams.service';

@Component({
  selector: 'ncri-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

  MANY_ITEMS = 'MANY_ITEMS';
  public many = ['The', 'possibilities', 'are', 'endless!'];
  public many2 = ['Explore', 'them'];

  subs = new Subscription();
  roleList: any = [];
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
  sub: any;
  gradeID = '';
  constructor(
     private service: TeamService,
    private dragulaService: DragulaService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.subs.add(dragulaService.dropModel(this.MANY_ITEMS)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
        console.log('dropModel:');
        console.log(el);
        console.log(source);
        console.log(target);
        console.log(sourceModel);
        console.log(targetModel);
        console.log(item);
      })
    );
    this.subs.add(dragulaService.removeModel(this.MANY_ITEMS)
      .subscribe(({ el, source, item, sourceModel }) => {
        console.log('removeModel:');
        console.log(el);
        console.log(source);
        console.log(sourceModel);
        console.log(item);
      })
    );
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
    this.getClientDemographicDropdownList();
    this.fetchTeam();
  }

  openErrorModal(): void {
    this.modalRef = this.modalService.show(this.errorModal);
  }
  
  openDeleteclient(deleteclient: TemplateRef<any>,data) {
    // this.userData = data
    this.modalRef = this.modalService.show(deleteclient);
    // this.modalRef.content.userActivate = 'Close';
  }

  
  getClientDemographicDropdownList(): void {
    this.roleLoader = true;
    
    this.service.ClientDemographicDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.roleList = res.data;
        this.roleList.map(it => it.check = false);
      }
      this.roleLoader = false;
    }, (error) => {
      this.roleLoader = false;
    });
  }

  fetchTeam(): void {
    this.userLoader = true;
    const obj = {
      id: this.gradeID
    };
    this.service.FetchTeam(obj).subscribe((res) => {
      if (res.status === 'success') {
        debugger
        this.userList = res.data;
        this.gradeForm.controls.name.setValue(this.userList.name);
        this.userList.map(it => it.check = false);
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
    const roleCheck = this.roleList.some(it => it.check === true);
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
      user_role_ids: this.roleList.filter(it => it.check === true).map(it => it.id),
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
