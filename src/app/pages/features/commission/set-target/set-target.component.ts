import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'ncri-set-target',
  templateUrl: './set-target.component.html',
  styleUrls: ['./set-target.component.scss']
})
export class SetTargetComponent implements OnInit {
  radioModel = 'left';
  radioModelDisabled = 'left';
  modelGroupDisabled=false;

  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment modal-xl'
  };
  @ViewChild('historyModal') historyModal: TemplateRef<any>;

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(private modalService: BsModalService) { }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true; 
  }
  tab:string = "employee";
  ngOnInit(): void {
  }

  setTab(tab: string) {
    this.tab = tab; 

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(this.historyModal,this.config);
  }
}
