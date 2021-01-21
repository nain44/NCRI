import { ActivatedRoute } from '@angular/router';
import { ClientManagementService } from './../../services/client-management.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { GlobalService } from 'src/app/core';

@Component({
  selector: 'ncri-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactionList = [];
  downloadFormat: string;
  token: string;
  obj: any;
  loader: boolean = false;
  isLoadMore: boolean = false;
  demographic: any;
  constructor(
    private service: ClientManagementService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private global: GlobalService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const url: string = this.route.snapshot['_routerState'].url;
      const arr: Array<string> = url.split('/');
      this.token = arr[2];
    });
    this.obj = {
      size: 10,
      page: 1,
      client_demographic_id: this.token
    };
    this.clientDemographicTransactionsList();
    this.fetchClientDemographic();
  }
  downloadClientDemographicTransactionsList(type): void {
    
    const obj = {
      output_format: this.downloadFormat = type,
      client_demographic_id: this.token
    };
    this.service.downloadClientDemographicTransactionsList(obj).subscribe((data) => {
      const a = this.renderer.createElement('a');
      this.renderer.setAttribute(a, 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
      this.renderer.setAttribute(a, 'download', 'transactions.' + type);
      this.renderer.setStyle(a, 'display', 'none');
      a.click();
    }, (error) => {
      console.log(error);
      var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(error.error.text);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'transactions.csv';
    hiddenElement.click();
    });

  }
   //fetch client demographics
   fetchClientDemographic(): void {
    const obj = {
      id: this.token
    };
    this.service.fetchClientDemographic(obj).subscribe((data) => {
      if (data.status) {
        this.demographic = data.data;
      }
    }, (error) => {
      console.log(error);
    });

  }

  loadMore() {
    this.obj.page += 1;
    this.clientDemographicTransactionsList();
  }
  clientDemographicTransactionsList(): void {
    this.loader = true;
    this.service.clientDemographicTransactionsList(this.obj).subscribe((data) => {
      if (data.status) {
        if(this.obj.page === 1){
          this.transactionList = data.data.qs;
        }else{
          this.transactionList = [...this.transactionList, ...data.data.qs];
        }
        
        //checking if load more should show or not
        if(data.data.count <= this.obj.size){
          this.isLoadMore = false;
        }else{
          this.isLoadMore = true;
        }
        

      }
      this.loader = false;
    }, (error) => {
      this.loader = false;
      console.log(error);
    });

  }

  filterByDate($event){
    debugger
    this.obj.page = 1;
    this.obj.start_transaction_date = this.global.dateFormat($event[0]);
    this.obj.end_transaction_date = this.global.dateFormat($event[1]);
    
    this.obj.filter_by_transaction_date = true;
    this.clientDemographicTransactionsList();

  }

}
