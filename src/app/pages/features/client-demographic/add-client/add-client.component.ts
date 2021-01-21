import { FormArray, Validators, FormBuilder } from '@angular/forms';
import { ClientDemographicService } from './../services/client-demographic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDemographicStore } from '../store';

@Component({
  selector: 'ncri-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
  providers: [UserDemographicStore]
})
export class AddClientComponent implements OnInit, OnDestroy {
  testData = {
    auto_generate_account_codes: true, client_number: '2020-0002', year: '',
    characters: '', prefix: '', short_name: 'test', company_name: 'test',
    busienss_type_id: '803b35d2-c10f-45bf-831d-bb048e6c4c84', product: 'dsf', tier: 'dsf',
    region_or_portfolio: 'af', contact_information_list: [{
      contact_title: 'kjhkjkkj',
      full_name: 'kljkl', email_address: 'mmasdjkl@live.om', country_code: 'af',
      phone_number: '12121212121', phone_number_ext: '2121', is_primary_contact: true
    }],
    address_line_1: 'jkhkjh', address_line_2: 'kjh', country_id: '58b75775-61b5-45d7-a162-4dfcc271d067',
    province_id: '1bda14ff-184e-44ca-bca3-c9e96d3f5840', city_id: '84318c3b-282a-4d4b-ad95-9ca3325d3cb5',
    zip_code_id: '212', zip_code: '212', phone_number: '2121212121', phone_number_ext: '212',
    cell_number: '2121221212', fax: '212', email_address: 'wsfsfsnf',
    home_branch_id: 'feb80265-5417-4496-b15d-c8b0ff4efc2c',
    client_type_id: '19aa3ea3-b5dd-4acd-b3db-22eade6cfbef', currency_code: 'USD',
    default_commission: 20, sales_representative_id: 'ab324571-b5b3-4cb3-935f-459e71066042',
    collector_id: 'ab324571-b5b3-4cb3-935f-459e71066042',
    client_status_id: 'e173c45b-e590-4cdd-801a-7afc81d121e0',
    client_group_id: 'e0c8bea1-bc84-4fb4-bb47-ca55fed71eba', master_client_id: '',
    is_master_client: true, restricted_access_client: true, comment_list: [{
      comment_text: 'test',
      document_url: 'https://ncri-media.s3.amazonaws.com/media/public/b29ebc6949ab4e83801abcf1ed5db44f.png'
    }], document_type_id: '2f81507b-bbe0-4e94-9e1a-29401306cb5a', document_list: [],
    document_description: 'this is test', group_list: [{ name: 'test', is_checked: false }],
    group_name: '', user_list: [{ username: 'test', password: 'test' }], username: '', password: '',
    client_portal_id: 'a25f8fff-2c4f-4c9f-b6c5-cdf2258efccb', required_document_list: [{ name: 'test' }],
    document_name: '', p_edit_collection_status: true, p_reminder: true, p_add_accounts_manually: true,
    p_upload_documents: true, p_upload_bulk_account_files: false, p_search_for_accounts: false,
    sr_accounts_report: false, sr_client_statement_without_adjustments: true,
    sr_client_statement_report_no_interest: true, sr_client_statement_with_adjustments: true,
    sr_payments_with_client_disb: true, sr_payments_with_notes: true,
    sr_portfolio_dashboard_report: true, sr_portfolio_liquidation: true,
    sr_status_report: false, sr_status_report_all_notes: false, sr_status_report_2: false,
    rf_first_name: true, rf_middle_name: false, rf_last_name: false, rf_aka: false,
    rf_company_name: true, rf_contact_title: false, rf_contact_name: false, rf_address: false,
    rf_city: true, rf_state_or_province: false, rf_zip_code: false, rf_cell: false, rf_phone: true,
    rf_fax: false, rf_ssn: false, rf_date_of_birth: false, rf_email_address: true, rf_notes: false,
    client_industry_id: '357177f0-5042-4a0e-85e8-20551015953f',
    correspondence_language_id: '898f857d-1bee-4736-a92f-17417676a5e1', start_date: '2020-10-26',
    last_placement: '2020-10-26', client_remittance_type_id: '20bbc299-0ca9-47b8-bdcb-221b3e0455fe',
    bank_account_number: '121212121212121', routing_number: '2123', cheques_payable_to: '154',
    is_pst_exempt: false, is_gst_or_hst_exempt: true,
    invoice_format_code_id: '9e033cad-c267-4ac0-b5dd-f784b0d8f861', sortBy: '',
    use_direct_invoicing: true, required_individual_debtor_invoices: true,
    show_outstanding_invoices: true, show_client_payments: true, show_acc_transactions: false,
    contra_available_funds: false, hold_debtor_cheques_for_days_num: 3, default_settlement: '20',
    return_merchandise_rate: '20', returnMerchandiseType: false, interest_rate_to_change: '20',
    interest_rate_cycle_type_id: '63a0f9bc-a7e0-4088-8e39-82f5b78b7f94', on_principle_only: true,
    calculate_daily: true, daily_debtor_trans: false,
    credit_bureau_id: '1f472a28-7717-48d9-ae94-c14cb7fa1f93',
    report_to_credit_bureau: true, report_to_credit_bureau_after_days_num: 20,
    no_credit_bureaus_on_debtors_allowed: true, client_requires_acknowledgements: true,
    client_requires_payment_notices: false, permission_form_received: false,
    third_party_platform_id: '5f860bac-a100-4156-813f-ed18793ffb17',
    client_short_name: 'tst', client_member_type: 'test', client_member_id: 'test',
    final_demands_start_id: '898f857d-1bee-4736-a92f-17417676a5e1',
    final_demands_end_id: '898f857d-1bee-4736-a92f-17417676a5e1',
    due_days_num: '2', client_users_final_demands: true,
    letter_sequence_for_listings: 'test',
    letter_id: '3615ee96-ec34-42ec-b3b1-b0c50da59db4',
    letter_sequence_start_id: '3615ee96-ec34-42ec-b3b1-b0c50da59db4',
    letter_sequence_end_id: '898f857d-1bee-4736-a92f-17417676a5e1',
    ace_number: '56565', pcs_number: '6565', date_for_custom_field: '2020-10-26',
    custom_field_id: '47b0b85a-696d-405e-8be3-7392c8faba40'
  };
  loader = false;
  linkCount = 0;
  constructor(
    public store: UserDemographicStore,
    private service: ClientDemographicService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.store.clientInfo.patchValue(this.testData)
    // this.store.clientDetailsForm.patchValue(this.testData)
    // this.store.commentsForm.patchValue(this.testData)
    // this.store.customFields.patchValue(this.testData)
    // this.store.documentsForm.patchValue(this.testData)
    // this.store.portalSettings.patchValue(this.testData)
    this.getFields('cmg_custom_fields');
    this.getFields('cmg_custom_fields_demo');
  }

  ngOnDestroy(): void {
    this.store.isSuccess = false;
  }

  get actionsControl(): FormArray {
    return this.store.customFields.get('actionsControl') as FormArray;
  }
  addActionsControl(value): void {
    this.actionsControl.push(this.fb.control(value.value));
    if (value.input_type === 'AN') {
      const regex = /^[a-zA-Z0-9 ]+$/;
      const required = value.required ? true : false;
      required ? this.actionsControl[this.actionsControl.length - 1].setValidators
        (Validators.compose([Validators.required, Validators.pattern(regex)])) :
        this.actionsControl[this.actionsControl.length - 1].setValidators
          (Validators.compose([Validators.pattern(regex)]));
      this.actionsControl[this.actionsControl.length - 1].updateValueAndValidity();
      this.store.customFields.updateValueAndValidity();
    } else {
      const required = value.required ? true : false;
      required ? this.actionsControl[this.actionsControl.length - 1].setValidators
        (Validators.compose([Validators.required])) : '';
      this.actionsControl[this.actionsControl.length - 1].updateValueAndValidity();
      this.store.customFields.updateValueAndValidity();

    }
  }

  getFields(screen: any): void {
    const obj = {
      screen_key: screen
    };
    this.service.FetchAssignedScreenOrientation(obj).subscribe((res) => {
      this.loader = false;
      // debugger;
      if (res.status === 'error') {

      } else {
        const form = JSON.parse(res.data[0].form_json);
        res.data[0].form_json = form;
        screen === 'cmg_custom_fields' ? this.store.customFieldList = res.data : this.store.customFieldDemoList = res.data;
        screen === 'cmg_custom_fields' && res.data.length !== 0 ? this.store.customFieldScreen = true :
          '';

        screen === 'cmg_custom_fields_demo' && res.data.length !== 0 ? this.store.customFieldDemoScreen = true :
          '';
        this.store.customFieldList[0]?.form_json?.form.forEach(element => {
          this.addActionsControl(element);

        });

        this.store.customFieldList.map(it => {
          it?.form_json?.form.map(field => {
            field.options = field.options.filter(k => k.is_active === true);
          })
        })

        this.store.customFieldDemoList.map(it => {
          it?.form_json?.form.map(field => {
            field.options = field.options.filter(k => k.is_active === true);
          })
        })

      }
    }, (error) => {
      // debugger;
      this.loader = false;
    });
    // this.modalRef.content.preview = 'Close';
  }

}
