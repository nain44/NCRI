import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PrivilegesStore } from '../../../store';

@Component({
  selector: 'ncri-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  toggleIcon: string = 'ti-plus'
  constructor(public router: Router, public privileges: PrivilegesStore) { }

  ngOnInit(): void {
  }
  //toggle Collapse
  toggleCollapse(el:any){ 
    if(el?.classList?.contains('collapse')){
      el?.classList?.remove('collapse');
      this.toggleIcon = 'ti-minus';
    }else{
      el?.classList?.add('collapse');
      this.toggleIcon = 'ti-plus';
    }
  }
}
