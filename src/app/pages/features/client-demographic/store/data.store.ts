import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core';

@Injectable()
export class UserDemographicStore {
    clientInfo: FormGroup;
    customFields: FormGroup;
    portalSettings: FormGroup;
    isSuccess: boolean = false;
    clientDetailsForm: FormGroup;
    commentsForm: FormGroup;
    documentsForm: FormGroup;

    isCustomField: boolean = false;
    isCustomDemoField: boolean = false;
    isComments: boolean = false;
    isDocuments: boolean = false;
    customFieldList = [];
    customFieldDemoList = [];
    customFieldScreen = false;
    customFieldDemoScreen = false;
    constructor(
        private fb: FormBuilder,
        private global: GlobalService
    ) {
        //init your forms here

        //1.
        this.initClientInfoForm();

        //3.
        this.initCustomFields();

        //6.
        this.initPortalSettings();

        // 2 client details
        this.initClientDetailsForm();
        // 4 comments
        this.initCommentsForm();
        // 5 documents
        this.initDocumentsForm();
    }

    //init client information form
    initClientInfoForm() {
        this.clientInfo = this.fb.group({
            //company information
            auto_generate_account_codes: [true],
            client_number: ['', Validators.required],
            year: [''],
            characters: [''],
            prefix: [''],
            short_name: ['', Validators.required],
            company_name: ['', Validators.required],
            business_type_id: ['', Validators.required],
            product: ['', Validators.required],
            tier: [''],
            region_or_portfolio: [''],

            //contact information
            contact_information_list: new FormArray([
                this.fb.group({
                    contact_title: ['', Validators.required],
                    full_name: ['', Validators.required],
                    email_address: ['', Validators.compose([Validators.required, Validators.email])],
                    country_code: ['', Validators.required],
                    phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^\+?1?\d{10,10}$/)])],
                    phone_number_ext: [''],
                    is_primary_contact: [false]
                })
            ]),

            //address details
            address_line_1: ['', Validators.required],
            address_line_2: [''],
            country_id: ['', Validators.required],
            province_id: ['', Validators.required],
            city_id: ['', Validators.required],
            zip_code_id: [''],
            zip_code: [''],
            postal_code:[''],
            phone_number: ['', Validators.compose([Validators.required, Validators.pattern(/^\+?1?\d{10,10}$/)])],
            phone_number_ext: [''],
            cell_number: ['', Validators.compose([Validators.pattern(/^\+?1?\d{10,10}$/)])],
            fax: [''],
            email_address: ['', Validators.compose([Validators.required, Validators.email])],

            //client system information
            home_branch_id: [''],
            client_type_id: ['', Validators.required],
            currency_code: ['', Validators.required],
            default_commission: ['', Validators.required],
            sales_representative_id: ['', Validators.required],
            collector_id: [''],
            client_status_id: ['', Validators.required],
            client_group_id: ['', Validators.required],
            master_client_id: [''],
            is_master_client: [true],
            restricted_access_client: [true],
        });

    }

    // init custom fields form
    initCustomFields(): void {
        this.customFields = this.fb.group({
            actionsControl: this.fb.array([

            ])
        });
    }

    //init portal settings form
    initPortalSettings() {
        this.portalSettings = this.fb.group({
            group_list: new FormArray([], Validators.required),
            group_name: [''],
            user_list: new FormArray([], Validators.required),
            username: [''],
            password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%#*?&]{8,}$/)]],
            client_portal_id: [''],
            client_portal_controller: [false],

            required_document_list: new FormArray([], Validators.required),
            document_name: [''],


            p_edit_collection_status: [false],
            p_reminder: [false],
            p_add_accounts_manually: [false],
            p_upload_documents: [false],
            p_upload_bulk_account_files: [false],
            p_search_for_accounts: [false],


            sr_accounts_report: [false],
            sr_client_statement_without_adjustments: [false],
            sr_client_statement_report_no_interest: [false],
            sr_client_statement_with_adjustments: [false],
            sr_payments_with_client_disb: [false],
            sr_payments_with_notes: [false],
            sr_portfolio_dashboard_report: [false],
            sr_portfolio_liquidation: [false],
            sr_status_report: [false],
            sr_status_report_all_notes: [false],
            sr_status_report_2: [false],

            rf_first_name: [false],
            rf_middle_name: [false],
            rf_last_name: [false],
            rf_aka: [false],
            rf_company_name: [false],
            rf_contact_title: [false],
            rf_contact_name: [false],
            rf_address: [false],
            rf_city: [false],
            rf_state_or_province: [false],
            rf_zip_code: [false],
            rf_cell: [false],
            rf_phone: [false],
            rf_fax: [false],
            rf_ssn: [false],
            rf_date_of_birth: [false],
            rf_email_address: [false],
            rf_notes: [false]
        })
    }

    // init Comments form
    initDocumentsForm(): void {
        this.documentsForm = this.fb.group({
            document_type_id: [''], // select
            document_list: [[]],
            document_description: [""],
        });
    }
    // init Comments form
    initCommentsForm(): void {
        this.commentsForm = this.fb.group({
            comment_list: [[]],
            // commentText: ['', Validators.required],
            // documentUrl: ['', Validators.required],
            // document_type_id: [''],
            // document_list: [''],
        });
    }
    // init client details form
    initClientDetailsForm(): void {
        this.clientDetailsForm = this.fb.group({
            // GENERIC INFORMATION
            client_industry_id: [''], // not required in excel
            correspondence_language_id: ['', Validators.required],
            start_date: [new Date(), Validators.required], // new Date()
            last_placement: [new Date()], // new Date()
            client_remittance_type_id: ['', Validators.required],

            // BANK DETAILS
            // Validators.pattern(/[0-9]{4}-[0-9]{4}-[0-9]{2}-[0-9]{10}/)
            bank_account_number: ['', Validators.pattern('[0-9]{9,}|^')],
            routing_number: [''],
            cheques_payable_to: [''],
            is_pst_exempt: [false],
            is_gst_or_hst_exempt: [false],

            // INVOICE OPTIONS
            invoice_format_code_id: ['', Validators.required],
            sort_by: [''],  // in ticket its radio in design its dropdown  // not in API
            use_direct_invoicing: [false],
            required_individual_debtor_invoices: [false],
            show_outstanding_invoices: [false],
            show_client_payments: [false],
            show_acc_transactions: [false],
            contra_available_funds: [false],

            // Financial Settings
            hold_debtor_cheques_for_days_num: [], // in design its dropdown in ticket its integer // select
            default_settlement: [],
            return_merchandise_rate: [], // condition for validation?
            return_merchandise_rate_type: [false], // not in API
            interest_rate_to_change: [  , Validators.compose([Validators.pattern('[0-9]{0,}\\.?[0-9]{0,2}?'), Validators.required])],
            interest_rate_cycle_type_id: ['', Validators.required], // select
            on_principle_only: [false],
            calculate_daily: [false],
            daily_debtor_trans: [false],

            // CREDIT BUREAU REPORTING SETTINGS
            credit_bureau_id: [''], // select // date in ticket dropdown in design
            report_to_credit_bureau: [false],
            report_to_credit_bureau_after_days_num: [], // select // integer in ticket dropdown in design
            no_credit_bureaus_on_debtors_allowed: [false],
            client_requires_acknowledgements: [false],
            client_requires_payment_notices: [false],
            permission_form_received: [false],


            // THIRD PARTY PLATFORM DETAILS
            third_party_platform_id: ['', Validators.required],  // select
            client_short_name: [''],
            client_member_type: [''],
            client_member_id: [''],

            // LETTER PROGRAM SEQUENCE
            final_demands_start_id: [''], // select
            final_demands_end_id: [''], // select
            due_days_num: [0], // select
            client_users_final_demands: [false],

            // AUTO CLOSE LETTERS
            letter_sequence_for_listings: [''],
            letter_id: [''], // select
            letter_sequence_start_id: [''], // select
            letter_sequence_end_id: [''], // select

        });

        
    }

    mergeFormData() {
        let obj = {
            ...this.clientInfo.value,
            ...this.commentsForm.value,
            ...this.documentsForm.value,
            ...this.portalSettings.value,
            ...this.clientDetailsForm.value,
            ...this.customFields.value
        }

        return obj;
    }

}
