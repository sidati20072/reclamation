import {Injectable} from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class GEventService {
    myWebSocket = webSocket('ws://localhost:8181/socket');

    constructor() {
    }

    receivedEvent() {
        return this.myWebSocket;
    }
}
