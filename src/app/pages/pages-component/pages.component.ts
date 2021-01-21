import { Component, OnInit } from '@angular/core';
import { GlobalService, PrivilegesStore, PusherService } from '../../core';

@Component({
  selector: 'ncri-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers:[PrivilegesStore]
})
export class PagesComponent implements OnInit {

  constructor(
    public global: GlobalService,
    private pusher_service: PusherService
    ) { }

  ngOnInit() {
    //init pusher
    this.pusher_service.initPusher();
  }

}
