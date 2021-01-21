import { ClientDemographicService } from './../../services/client-demographic.service';
import { UserDemographicStore } from './../../store/data.store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

declare var $;
@Component({
  selector: 'ncri-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  client_industry_id = [
  ];
  correspondence_language_id = [
  ];
  client_remittance_type_id = [

  ];
  invoice_format_code_id = [

  ];
  sortBy = [
   {id:'DE', name: 'Date Entered'},
   {id:'P', name: 'Product'},
   {id:'T', name: 'Time'},
   {id:'TD', name: 'Transaction Date'},
  ];
  interest_rate_cycle_type_id = [

  ];
  credit_bureau_id = [

  ];
  third_party_platform_id = [

  ];
  final_demands_start_id = [

  ];
  final_demands_end_id = [

  ];
  due_days_num = [

  ];
  letter_id = [

  ];
  letter_sequence_start_id = [

  ];
  letter_sequence_end_id = [

  ];
  clientDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public store: UserDemographicStore,
    private service: ClientDemographicService
  ) {
  }

  ngOnInit(): void {
    // days dropdown
    for (let index = 0; index < 30; index++) {
      let day = (index + 1);
      this.due_days_num.push(day);
    }

    this.getClient_industry_id();
    this.getClient_remittance_type_id();
    this.getinvoice_format_code_id();
    this.getinterest_rate_cycle_type_id();
    this.getcredit_bureau_id();
    this.getthird_party_platform_id();
    this.getletter_id();
    this.getletter_sequence_end_id();
    this.getletter_sequence_start_id();
    this.getfinal_demands_start_id();
    this.getfinal_demands_end_id();
  }
  getClient_industry_id(): void {
    this.service.getClient_industry_id().subscribe((data) => {
      if (data.status) {
        this.client_industry_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }

  getClient_remittance_type_id(): void {
    this.service.getclient_remittance_type_id().subscribe((data) => {
      if (data.status) {
        this.client_remittance_type_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getinvoice_format_code_id(): void {
    this.service.getinvoice_format_code_id().subscribe((data) => {
      if (data.status) {
        this.invoice_format_code_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getinterest_rate_cycle_type_id(): void {
    this.service.getinterest_rate_cycle_type_id().subscribe((data) => {
      if (data.status) {
        this.interest_rate_cycle_type_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getcredit_bureau_id(): void {
    this.service.getcredit_bureau_id().subscribe((data) => {
      if (data.status) {
        this.credit_bureau_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getthird_party_platform_id(): void {
    this.service.getthird_party_platform_id().subscribe((data) => {
      if (data.status) {
        this.third_party_platform_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getfinal_demands_start_id(): void { // no call available
    this.service.getfinal_demands_start_id().subscribe((data) => {
      if (data.status) {
        this.final_demands_start_id = data.data
        // this.final_demands_start_id = [{ name: 'dem 1', id: '503c1484-1240-11eb-adc1-0242ac120002' },
        // { name: 'dem 2', id: '503c1484-1240-11eb-adc1-0242ac120002' }];
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getfinal_demands_end_id(): void { // no call available
    this.service.getfinal_demands_end_id().subscribe((data) => {
      if (data.status) {
        this.final_demands_end_id = data.data;
        this.correspondence_language_id = data.data
        // this.final_demands_end_id = [{ name: 'dem 1', id: '503c1394-1240-11eb-adc1-0242ac120002' },
        // { name: 'dem 2', id: '503c1394-1240-11eb-adc1-0242ac120002' }];
        // this.final_demands_end_id = data.data;
        // this.correspondence_language_id = [{ name: 'French', id: '503c1394-1240-11eb-adc1-0242ac120002' },
        // { name: 'English', id: '503c1394-1240-11eb-adc1-0242ac120002' }];
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  // getdue_days_num(): void { // no call available
  //   this.service.getdue_days_num().subscribe((data) => {
  //     if (data.status) {
  //       this.due_days_num = data.data;
  //       // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
  //     }
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }
  getletter_id(): void {
    this.service.getletter_id().subscribe((data) => {
      if (data.status) {
        this.letter_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getletter_sequence_start_id(): void { // no call available
    this.service.getletter_sequence_end_id().subscribe((data) => {
      if (data.status) {
        this.letter_sequence_start_id = data.data;
        // this.letter_sequence_start_id = [{name: 'Seq 1', id: 'a25f8fff-2c4f-4c75-b6c5-cdf2258efccb'},
        // {name: 'Seq 2', id: 'a25f8fff-2c4f-4c9f-tr43-cdf2258efccb'}];
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
  getletter_sequence_end_id(): void { // no call available
    this.service.getletter_sequence_end_id().subscribe((data) => {
      if (data.status == 'success') {
        this.letter_sequence_end_id = data.data;
        // this.letter_sequence_end_id = [{ name: 'Seq 1', id: '503c1556-1240-11eb-adc1-0242ac120002' },
        // { name: 'Seq 2', id: '503c1556-1240-11eb-adc1-0242ac120002' }];
        // this.letter_sequence_end_id = data.data;
        // this.addCommentForm.controls.documentUrl.setValue(data.data.url);
      }
    }, (error) => {
      console.log(error);
    });
  }

  select2Init(){
    $(".selectDropdown").select2({
      minimumResultsForSearch: -1
  });
  $('.selectDropdown').on('select2:select', function (e) {  
    $(e.target).parent().find('.select2-container').addClass('select-valid');
  });
  $('.selectDropdown').on('select2:open', function (e) {   
    $(e.target).parent().find('.select2-container').addClass('select-valid');
  });
  }

  ngAfterViewInit(){
    // this.select2Init();
  }
}
