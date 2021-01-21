import { Component, OnInit, Inject } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'ncri-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
formSearch: any;
  constructor(@Inject(DOCUMENT) private document: Document,public global: GlobalService) { }
  logo  = "https://ncri-media.s3.amazonaws.com/logo.jpg?time="+new Date().getTime()
  ngOnInit(): void {
  }
  //log out
  logout() {
    this.global.logOut();
  }
  //theme change
  openDrawer() {
    const drawer = this.document.querySelector('.ncri-drawer');
    drawer.classList.add('open');
  }
}
