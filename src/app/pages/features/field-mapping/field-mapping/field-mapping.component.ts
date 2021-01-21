import { AfmStoreService } from './../services/afm-store.service';
import { GlobalService } from 'src/app/core';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options } from 'select2';
@Component({
  selector: 'ncri-field-mapping',
  templateUrl: './field-mapping.component.html',
  styleUrls: ['./field-mapping.component.scss']
})
export class FieldMappingComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;
  
@ViewChild('searchInput') searchInput: ElementRef;
config = {
  animated: true,
  keyboard: false,
  backdrop: true,
  ignoreBackdropClick: false,
  class: 'add-comment add-comment--delete'
};

  // select2
  public defaultValue: Array<Select2OptionData>;
  public options: Options;
  public value: string[];
  public placeholder = 'placeholder';
  selectedStatusFilter = 'ALL';

  // end

constructor(
  private modalService: BsModalService,
  public global: GlobalService,
  public store: AfmStoreService
) {  
}
ngOnDestroy(): void {
  this.store.fieldMappingForm.reset();
  this.store.previewMap = false;
  this.store.fileLoader = false;
  this.store.uploadComplete = '50%';
}

ngOnInit(): void {
  this.defaultValue  = [
    {
      id: 'opt1',
      text: 'Options 1'
    },
    {
      id: 'opt2',
      text: 'Options 2'
    },
    {
      id: 'opt3',
      text: 'Options 3'
    },
    {
      id: 'opt4',
      text: 'Options 4'
    }
  ];

  this.options = {
    multiple: false,
    minimumResultsForSearch: -1,
    theme: "custom-select",  
    // placeholder: 'Default Value (Optional)',
  };

}

openModalDelete(template: TemplateRef<any>): void { 
  this.modalRef = this.modalService.show(template,this.config);
}

}
