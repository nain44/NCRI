import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GradeService } from '../service';

@Component({
  selector: 'ncri-view-grade',
  templateUrl: './view-grade.component.html',
  styleUrls: ['./view-grade.component.scss']
})
export class ViewGradeComponent implements OnInit {
  roleList: any = [];
  userList: any = [];
  userLoader: boolean = false;
  roleLoader: boolean = false;
  gradeForm: FormGroup;
  responseText: any = [];
  modalRef: BsModalRef;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  loader: boolean = false;
  newGradeID: any;
  gradeAvailable: string = "";
  gradeID: string = "";
  sub: any;
  gradeDetail: any;
  constructor(
    private service: GradeService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.gradeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
    });

    //fetching query param from route
    this.sub = this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.gradeID = params.id ? params.id : "";
      this.gradeID === "" ? this.router.navigate(['/grade']) : "";
    });
  }

  ngOnInit(): void {
    this.fetchGradeDetail();
  }

  fetchGradeDetail(){
    let obj = {
      id: this.gradeID
    }
    this.service.fetchGrade(obj).subscribe((res:any) => {
      if(res.status === "success"){
        // debugger
        this.gradeForm.controls.name.setValue(res.data.user_grade.name);
        this.gradeForm.controls.description.setValue(res.data.user_grade.description);
        this.gradeDetail = res.data;
        this.getRoleList();
        this.getUserList();
      }
    },(error) =>{

    })
  }

  openErrorModal(){
    this.modalRef = this.modalService.show(this.errorModal);
  }

  getRoleList(){
    this.roleLoader = true;
    this.service.getRoleList().subscribe((res) => {
      if(res.status === "success"){
        this.roleList = res.data;
        this.roleList.map(it => {
          let check = this.gradeDetail.user_roles.some(r => r.user_role_id === it.id);
          check === true ? it.check = true : it.check = false;
        });
      }
      this.roleLoader = false;
    },(error) =>{
      this.roleLoader = false;
    });
  }

  getUserList(){
    this.userLoader = true;
    this.service.getUserList().subscribe((res) => {
      if(res.status === "success"){
        this.userList = res.data.qs;
        this.userList.map(it => {
          let check = this.gradeDetail.user_ids.some(u => u.id === it.id)
          check ? it.check = true : it.check = false;
        });
      }
      this.userLoader = false;
    },(error) =>{
      this.userLoader = false;
    });
  }

  updateGrade(obj:any){
    this.loader = true;
    this.service.updateGrade(obj).subscribe((res:any) => {
      if(res.status === "success"){
        this.router.navigate(['/grade']);
      }else{
        this.loader = false;
        if(res.errors){
          let list = []
          for(var key in res.errors){
            let error = {name:key,list:res.errors[key].toString()};
            list.push(error);
          }
          this.responseText = list;
        }else{
          this.responseText = [{name:"Error",list:res.code}];
        }
        this.openErrorModal();
      }
      
    },(error) =>{
      this.loader = false;
      this.openErrorModal();
      this.responseText = [{name:"Error",list:error.message}];
    });
  }

  submitForm(){
    let roleCheck = this.roleList.some(it => it.check === true);
    let userCheck = this.userList.some(it => it.check === true);
    if(roleCheck === false){
      this.responseText = [{name:"Error: ", list:"Please select at least one role to create grade."}];
      this.openErrorModal();
      return
    }else if(userCheck === false){
      this.responseText = [{name:"Error: ", list:"Please select at least one user to create grade."}];
      this.openErrorModal();
      return
    }

    let obj = {
      "id": this.gradeID,
      "name": this.gradeForm.get('name').value,
      "description": this.gradeForm.get('description').value,
      "user_role_ids": this.roleList.filter(it => it.check === true).map(it => it.id),
      "user_ids": this.userList.filter(it => it.check === true).map(it => it.id)
    }
    this.updateGrade(obj);
  }

  isGradeAvailable(){
    this.gradeAvailable = "";
    this.service.isGradeAvailable({name:this.gradeForm.controls.name.value}).subscribe((res) => {
      if(res.status === "success"){
        if(res.data.is_available === false){
          this.gradeAvailable = "Grade name already taken.";
        }
      }
    },(error) =>{
      this.gradeAvailable = "";
    })
  }


}
