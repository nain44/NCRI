import { UserDemographicStore } from './../../store/data.store';
import { ClientDemographicService } from './../../services/client-demographic.service';
import { Component, OnInit } from '@angular/core';
import { Options } from 'select2';
declare var $;

@Component({
  selector: 'ncri-custom-fields-demo',
  templateUrl: './custom-fields-demo.component.html',
  styleUrls: ['./custom-fields-demo.component.scss']
})
export class CustomFieldsDemoComponent implements OnInit {
  customFieldDropdown: any = [];
  public options: Options;

  constructor(

    public store: UserDemographicStore,
    private service: ClientDemographicService
  ) {

    this.options = {
      multiple: false,
      minimumResultsForSearch: -1,
      theme: 'custom-select',
      placeholder: '',
    };
  }

  ngOnInit(): void {
    this.store.isCustomDemoField = true;
    this.getCustomFieldDropdown();
  }

  formData() {
    this.store.customFields.value
  }

  getCustomFieldDropdown() {
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
  select2Init() {
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

  ngAfterViewInit() {
    this.select2Init();
  }

}
