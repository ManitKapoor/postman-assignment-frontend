import { Injectable, Output, EventEmitter } from '@angular/core';
declare var SockJS, Stomp;
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http/http.service';

let apiPart = '';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

   isLoading = false;

  constructor(private auth:AuthService, private http:  HttpService) {

  }
  stompClient = null;
  @Output() userList:EventEmitter<any> = new EventEmitter();
  
  initializeWebSocketConnection() {
      var socket = new SockJS(apiPart + '/websocket?authentication=' + this.auth.getToken());
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
          this.addUser();
          this.loadUsers();
          this.stompClient.subscribe(apiPart + '/topic/activity', (message) => {
            this.loadUsers();
          });
      });
  }

  loadUsers() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.http.secureGet(apiPart + '/users').then(userList => {
      this.isLoading = false;
      this.userList.emit(userList);
    }).catch(error => {
      console.log(error);
    });
  }

  removeUser() {
    let packetData = {
      messageType: "user_remove",
      userData: this.auth.getUserDetails()
    };
    this.stompClient.send(apiPart + "/app/activity", {}, JSON.stringify(packetData));
  }
  
  disconnect() {
      if (this.stompClient !== null) {
        this.removeUser();
        this.stompClient.disconnect();
      }
  }
  
  addUser() {
      let packetData = {
        messageType: "user_add",
        userData: this.auth.getUserDetails()
      };
      this.stompClient.send(apiPart + "/app/activity", {}, JSON.stringify(packetData));
  }

}
