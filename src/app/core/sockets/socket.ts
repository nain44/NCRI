import { Injectable } from '@angular/core';
import { Store } from './store';
import { SocketState } from './socket.state';
import { GlobalService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class Socket extends Store<SocketState> {

    private _socket: any;

    constructor(private global: GlobalService) {
        super(new SocketState());

    }

    // to initialize socket 
    initSocket(url: string) {
        //first close existing connection
        this.closeSocket();
        //make new connection
        this._socket = new WebSocket(url);
        console.log("Attempting Websocket Connection");

        this._socket.onopen = () => {
            console.log("Successfully opened");
            this._socket.send("Bearer " + this.global.token);
            //this.setState('connected');
        }

        this._socket.onclose = (event) => {
            console.log("Socket closed connection: ", event);
            //this.completeState();
            this.setState('closed');
        }

        this._socket.onerror = (error) => {
            console.log("Socket error", error);
            this.setState('error');
        }

        this._socket.onmessage = (message) => {
            if (message.data === 'connected') {
                this.setState(message.data);
            } else {
                this.setState(JSON.parse(message.data));
            }

        }
    }
    // close socket
    closeSocket() {
        if (this._socket) {
            this._socket.onclose = ()=>{};
            console.log("Socket closed connection");
            this._socket.close();
            this._socket = null;
        }
    }
    // check socket status
    socketStatus() {
        if (this._socket) {
            return this._socket.readyState;
        }
    }
    // to publish stream
    sendMessage(data: any) {
        this._socket.send(data);
    }

}

