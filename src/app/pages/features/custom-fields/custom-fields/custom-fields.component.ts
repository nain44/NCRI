import { StoreService } from './../service/store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ncri-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss']
})
export class CustomFieldsComponent implements OnInit, OnDestroy {

  constructor(
    private store: StoreService
  ) { }

  ngOnInit(): void {
    debugger
  }

  ngOnDestroy(){
      this.store.customFieldForm.reset();
      this.store.fileList = [];
  }

}
