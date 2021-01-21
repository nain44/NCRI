import { Component, OnInit } from '@angular/core';
import { PusherService } from 'src/app/core';
import { AccountImportService } from '../services';
import { AccountImporterStore } from '../store';

@Component({
  selector: 'ncri-account-importer',
  templateUrl: './account-importer.component.html',
  styleUrls: ['./account-importer.component.scss'],
  providers:[AccountImportService,AccountImporterStore]
})
export class AccountImporterComponent implements OnInit {

  constructor(
    private pusher_service: PusherService,
    private store: AccountImporterStore
  ) { }

  ngOnInit(): void {
    this.pusher_service.instance;
    //subscribing to file importer channel
    this.subscribeToChannel();
    //subscribing to rollback channel
    this.subscribeToRollbackChannel();
  }

  subscribeToChannel(){
    this.store.channel = this.pusher_service.instance.subscribe(this.store.channelName);
  }

  subscribeToRollbackChannel(){
    this.store.rollbackChannel = this.pusher_service.instance.subscribe(this.store.rollbackChannelName);
  }

}
