import { Injectable } from '@angular/core';
import { APP_CONFIG } from "../configs/app.config"
import { GlobalService } from '../services';
declare var Pusher;
@Injectable({ providedIn: 'root' })
export class PusherService {
    private _pusher: any;
    constructor(
        private global: GlobalService
    ) { 
    }


    //init pusher globally
    initPusher() {
        this._pusher = new Pusher(APP_CONFIG.pusher_api_key, {
            cluster: 'mt1',
            authEndpoint: APP_CONFIG.apiBaseUrl+'/api/v1/cmt/AuthenticatePrivateChannel',
            auth: {
                headers: {
                  'Authorization': "JWT " + this.global.token
                }
              }
        });
    }

    get instance(){
        return this._pusher;
    }
}