import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core';
import { ClientDemographicService } from '../../services/client-demographic.service';
import { UserDemographicStore } from '../../store';
declare var $;
import { Options } from 'select2';
@Component({
  selector: 'ncri-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss']
})
export class CustomFieldsComponent implements OnInit {
  customFieldDropdown: any = [];
  public options: Options;

constructor(
  public store: UserDemographicStore,
  private service: ClientDemographicService,
) { 
  
  this.options = {
    multiple: false,
    minimumResultsForSearch: -1,
    theme: 'custom-select'
  };
}

ngOnInit(): void {
  this.store.isCustomField = true;
  this.getCustomFieldDropdown();
}


formData(){
  this.store.customFields.value
}

getCustomFieldDropdown(){
  this.service.getSystemFieldList().subscribe((res: any) => {
    if (res.status === "success") {
      this.customFieldDropdown = res.data
    }
  }, (error) => {

  })
}

// dateFormat(){
//   this.store.customFields.controls.date_for_custom_field.setValue(this.global.dateFormat(new Date()));
// }
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
  $(".input-label").addClass('initail-label');
  $(".selectDropdown").removeClass('ng-valid');
  $('.selectDropdown.valid-check').change(function () {
    if (!$(this).val()) {
      $(this).removeClass("ng-valid");
    } else {
      $(this).addClass("ng-valid");
    }
  });
  $(".input-label").on('focus', function () {
    $(this).removeClass('initail-label');
  });
  $('.input-label').blur(function () {
    if (!$(this).val()) {
      $(this).addClass("initail-label");
    } else {
      $(this).removeClass("initail-label");
    }
  });
}

ngAfterViewInit(){
  this.select2Init();
}
}
