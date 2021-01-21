import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { RoleService } from '../services';

@Component({
  selector: 'ncri-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  sub: any;
  roleID: string = "";
  selectAll: boolean = false;
  userList: any = [];
  paginationConfig = {
    count: 0,
    size: 10,
    page: 1,
    filter_by:"ALL",
    search_text:""
  }
  loader: boolean;
  responseText: string;
  error: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private service: RoleService
  ) {

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.roleID = (params['roleID'] ? params['roleID'] : "");
        this.roleID === "" ? this.router.navigate(['/role']) : "";
      });

  }

  searchUser(){
    this.paginationConfig.page = 1;
    this.getUserList();
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userService.usersList(this.paginationConfig).subscribe((res) => {
      //debugger
      if (res.status === "success") {
        this.userList = res.data.qs;
        this.userList.map(it => it.check = false);
        this.paginationConfig.count = res.data.count;
      }
    }, (error) => {
      //debugger
    })
  }

  selectAllUser() {
    this.selectAll === true ? this.userList.map(it => it.check = true) : this.userList.map(it => it.check = false);
  }

  selectCheckBox() {
    let check = this.userList.some(it => it.check === false);
    check === true ? this.selectAll = false : this.selectAll = true;
  }

  pageChanged(event:any){
    this.paginationConfig.page = event.page;
    this.getUserList();

  }

  assignUserMultipleRoles() {
    let list = this.userList.filter(it => it.check === true).map(it => it.id);
    if(list.length === 0){
      this.error = true;
      this.responseText = "Please select at least one user.";
      return
    }
    this.loader = true;
    this.responseText = "";
    let obj = {
      user_role_id: this.roleID,
      user_ids: list
    }
    this.service.assignRoleToMultipleUser(obj).subscribe((res) => {
      //debugger
      if (res.status === "success") {
        this.error = false;
        this.router.navigate(['/role']);
      } else {
        this.error = true;
        let text = res?.errors?.non_field_errors ? res?.errors?.non_field_errors.toString() : "";
        this.responseText = text ? text : res.code;
      }
      this.loader = false;
    }, (error) => {
      //debugger
      this.error = true;
      this.responseText = "Sorry something went wrong, Try again later.";
      this.loader = false;
    })
  }

}
