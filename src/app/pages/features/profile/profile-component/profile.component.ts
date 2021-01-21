import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfileService } from '../service';

@Component({
  selector: 'ncri-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error: boolean = false;
  imageLoader: boolean = false;
  imageResponse: string = '';

  constructor(
    private service: ProfileService,
    private modalService: BsModalService,
    ) { }
  userDetails:any = {};
  loader:boolean = false;
  responseText: any = [];
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  modalRef: BsModalRef;
  profileImage: any = '';
  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(){
    let data:any = localStorage.getItem('details');
    if(data !== null){
      data = JSON.parse(data);
      this.userDetails.first_name = data.user.first_name;
      this.userDetails.last_name = data.user.last_name;

      this.userDetails.date_of_joining = data.user.date_of_joining;
      this.userDetails.email = data.user.email;

      this.userDetails.username = data.user.username;
      this.userDetails.cell_number = data.user.cell_number;

      this.profileImage = data.user.avatar_url;
    }
  }

  updateProfile(){
    let obj = {
      first_name: this.userDetails.first_name,
      last_name: this.userDetails.last_name
    };
    this.loader = true;
    this.service.updateProfile(obj).subscribe((res) => {
      if(res.status === 'error'){
        this.error = true;
        let list = [];
        if(res.errors){
          for(var key in res.errors){
            let obj = {name:key, list: res.errors[key].toString()}
            list.push(obj);
          }
          this.responseText = list;
        }else{
          this.responseText = [{name:'Error', list:res.code}];
        }
      }else{
        let data:any = localStorage.getItem('details');
        if(data !== null){
          data = JSON.parse(data);
          data.user.first_name = obj.first_name;
          data.user.last_name = obj.last_name;

          localStorage.setItem('details', JSON.stringify(data));
        }
        this.error = false;
        this.responseText = [{name:'', list:'Profile updated Successfully.'}];
      }
      // this.openErrorModal();
      this.loader = false;
    },(error) =>{
      this.error = true;
      this.responseText = [{name:'Error', list:'Sorry something went wrong try again.'}];
      this.openErrorModal();
      this.loader = false;
    })
  }

  changeImage(file:any){
    this.imageLoader = true;
    let formData = new FormData();
    formData.append('avatar', file);
    this.imageResponse = '';
    this.service.changeImage(formData).subscribe((res) => {
      //debugger
      this.imageLoader = false;
      if (res.status === 'success') {
        if (res.data && res.data.avatar_url) {
          let user = localStorage.getItem('details');
          if (user !== null && JSON.parse(user).user) {
            let details = JSON.parse(user);
            details.user.avatar_url = res.data.avatar_url;
            localStorage.setItem('details',JSON.stringify(details));
          }
        }
        this.readURL(file);
      }else{
        let list = [];
        if(res.errors){
          for(var key in res.errors){
            let obj = {name:key, list: res.errors[key].toString()}
            list.push(obj);
          }
          this.responseText = list;
        }else{
          this.responseText = [{name:'Error', list:res.code}];
        }
        this.openErrorModal();
        // this.imageResponse = res.code;
      }
      
    },(error) =>{
      // debugger
      this.responseText = [{name:'Error', list:'Sorry something went wrong try again.'}];
      this.openErrorModal();
      this.imageLoader = false;
    })
  }

   readURL(file) {
    // if (input.currentTarget.files && input.currentTarget.files[0]) {
      var reader = new FileReader();
      let _this = this;
      reader.onload = (e) => {
        // $('#blah').attr('src', e.target.result);
        _this.profileImage = e.target.result;
      }
      
      reader.readAsDataURL(file); // convert to base64 string
    // }
  }

  onChange(event:any){
    debugger
    if(event.currentTarget.files.length > 0){
      this.changeImage(event.currentTarget.files[0])
    }
    
  }

  openErrorModal() {
    this.modalRef = this.modalService.show(this.errorModal);
  }

}
