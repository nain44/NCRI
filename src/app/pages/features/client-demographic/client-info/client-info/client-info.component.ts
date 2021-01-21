import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDemographicService } from '../../services/client-demographic.service';
import { UserDemographicStore } from '../../store';
declare var $;

@Component({
  selector: 'ncri-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  // clientInfo: FormGroup;
  showMasterClient: boolean = true;
  BusinessTypeDropdownList: any = [];
  CountryCodeDropdownList: any = [];
  CountryDropdownList: any = [];
  CityDropdownList: any = [];
  ProvinceDropdownList: any = [];

  HomeBranchDropdownList: any = [];
  CurrencyCodeDropdownList: any = [];

  ClientStatusDropdownList: any = [];
  ClientTypeDropdownList: any = [];
  ClientGroupDropdownList: any = [];
  collectorList: any = [];
  salesRepresentativeList: any = [];
  masterClientList: any = [{ name: 'Seq 1', id: '503c1484-1240-11eb-adc1-0242ac120002' },
  { name: 'Seq 2', id: '503c1484-1240-11eb-adc1-0242ac120002' }];
  number: number = 1;
  error: boolean = false;
  switchAutoGenerateField: boolean = true;

  // BusinessTypeDropdownList:any [];
  // BusinessTypeDropdownList:any [];
  // BusinessTypeDropdownList:any [];

  constructor(
    private fb: FormBuilder,
    public store: UserDemographicStore,
    private service: ClientDemographicService
  ) {
    this.toggleMasterClient();
  }

  // clientInfo = this.store.clientInfo



  toggleMasterClient() {
    let check = this.store.clientInfo.controls.is_master_client.value;
    if(check){
      this.store.clientInfo.controls.master_client_id.setValue("");
    }
    check === true ? this.showMasterClient = false : this.showMasterClient = true;

  }

  addContactForm() {
    let formArray = this.store.clientInfo.controls.contact_information_list as FormArray;
    if (formArray.length < 3) {
      formArray.push(this.fb.group({
        contact_title: ['', Validators.required],
        full_name: ['', Validators.required],
        email_address: ['', Validators.compose([Validators.required, Validators.email])],
        country_code: ['', Validators.required],
        phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^\+?1?\d{9,15}$/)])],
        phone_number_ext: [''],
        is_primary_contact: [false]
      }));
    }
  }

  submitData() {
    debugger
    let values = this.store.clientInfo.value;
    console.log(values);
  }

  ngOnInit(): void {
    // this.generateClientNumber();
    this.getBusinessType();
    this.getCountryCode();
    this.getCountry();
    this.getCity();
    this.getProvince();
    this.getHomeBranch();
    this.getCurrency();
    this.getClientStatus();
    this.getClientType();
    this.getClientGroup();
    this.getCollector();
    this.getMasterClient();
    this.getClientNumber();
  }

  getBusinessType() {
    this.service.getBusinessTypeDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.BusinessTypeDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getCountryCode() {
    this.service.getCountryCodeDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.CountryCodeDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getCountry() {
    this.service.getCountryDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.CountryDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getCity() {
    this.service.getCityDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.CityDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getProvince() {
    this.service.getProvinceDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.ProvinceDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getHomeBranch() {
    this.service.getHomeBranchDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.HomeBranchDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getCurrency() {
    this.service.getCurrencyCodeDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        // this.CurrencyCodeDropdownList = res.data;
        for (var key in res.data) {
          let obj = { name: res.data[key].name, code: res.data[key].code };
          this.CurrencyCodeDropdownList.push(obj);
        }
      }
    }, (error) => {

    });
  }

  // getSalesRepresentative(){
  //   this.service.getBusinessTypeDropdownList().subscribe((res) =>{

  //   },(error) =>{

  //   })
  // }

  getClientStatus() {
    this.service.getClientStatusDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.ClientStatusDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getMasterClient() {
    this.service.getClientDemographicDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        if (res.data.length === 0) {
          this.masterClientList = [{ name: 'Seq 1', id: '503c1556-1240-11eb-adc1-0242ac120002' },
          { name: 'Seq 2', id: '503c1556-1240-11eb-adc1-0242ac120002' }];
        } else {
          this.masterClientList = res.data;
        }

      }
    }, (error) => {

    });
  }

  getClientType() {
    this.service.getClientTypeDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.ClientTypeDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  getCollector() {
    this.service.getReportingUserDropdownList().subscribe((res) => {
      if (res.status === 'success') {
        this.collectorList = res.data;
        this.salesRepresentativeList = res.data;
      }
    }, (error) => {

    });
  }

  getClientGroup() {
    this.service.getClientGroupDropdownList().subscribe((res) => {
      if (res.status = 'success') {
        this.ClientGroupDropdownList = res.data;
      }
    }, (error) => {

    });
  }

  generateClientNumber() {
    var string = '' + this.number;
    var pad = '0000';
    let auto_num = new Date().getFullYear() + '-' + (pad.substring(0, pad.length - string.length) + string);
    // return d;
    this.store.clientInfo.controls.client_number.setValue(auto_num);
  }

  checkClientNumber() {
    if (this.store.clientInfo.controls.year.value && this.store.clientInfo.controls.characters.value &&
      this.store.clientInfo.controls.prefix.value) {
      this.error = false;
      let obj = {
        // client_number: this.store.clientInfo.controls.client_number.value
        client_number: this.store.clientInfo.controls.year.value + '-' +
          this.store.clientInfo.controls.characters.value + '-' + this.store.clientInfo.controls.prefix.value
      };
      this.service.checkClientNumberAvailability(obj).subscribe((res: any) => {
        if (res.status === 'success') {
          if (res.data.is_available === false) {
            this.error = true;
          } else {
            this.store.clientInfo.controls.client_number.setValue(obj.client_number);
          }
        }
      }, (error) => {

      });
    }

  }

  getClientNumber() {
    this.service.getClientNumberByYear().subscribe((res) => {

      if (res.status === 'success') {
        this.store.clientInfo.controls.client_number.setValue(res.data.available_client_number);
      }
    }, (error) => {

    });
  }

  onAutoChange() {
    let check = this.store.clientInfo.controls.auto_generate_account_codes.value;
    if (check === false) {
      this.switchAutoGenerateField = false;
      this.store.clientInfo.controls.year.setValue('');
      this.store.clientInfo.controls.characters.setValue('');
      this.store.clientInfo.controls.prefix.setValue('');
    } else {
      this.store.clientInfo.controls.client_number.setValue('');
      this.switchAutoGenerateField = true;
      this.getClientNumber();
    }
  }
  select2Init(){
  //   $(".selectDropdown").select2({
  //     minimumResultsForSearch: -1
  // });
  // $('.selectDropdown').on('select2:select', function (e) {  
  //   $(e.target).parent().find('.select2-container').addClass('select-valid');
  // });
  // $('.selectDropdown').on('select2:open', function (e) {   
  //   $(e.target).parent().find('.select2-container').addClass('select-valid');
  // });
  // $(".input-label").addClass('initail-label');
  // $(".selectDropdown").removeClass('ng-valid');
  // $('.selectDropdown.valid-check').change(function(){ 
  //   if(!$(this).val()){
  //       $(this).removeClass("ng-valid");
  //   } else{
  //       $(this).addClass("ng-valid");
  //   }
  // });
  // $(".input-label").on('focus',function(){ 
  //   $(this).removeClass('initail-label');  
  // });
  // $('.input-label').blur(function(){
  //   if(!$(this).val()){
  //       $(this).addClass("initail-label");
  //   } else{
  //       $(this).removeClass("initail-label");
  //   }
  // }); 
  }

  ngAfterViewInit(){
    // this.select2Init();
  }

  selectIsPrimary(index:any){
    var form = this.store.clientInfo.controls.contact_information_list['controls'];
    for(var i =0; i<form.length; i++){
      if(i !== index){
        form[i].controls.is_primary_contact.setValue(false);
      }
    }
  }
}
