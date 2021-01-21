import { Injectable } from '@angular/core';

@Injectable()
export class AccountImporterStore {
    constructor() { }
    currentFileID: string = "";
    channelName: string = "private-BulkClientDemographicDataUploadFromFile";
    rollbackChannelName: string = "private-BulkClientDemographicDataRollbackFromFile";
    channel: any;
    rollbackChannel:any;
    IsNew: boolean = false;

}