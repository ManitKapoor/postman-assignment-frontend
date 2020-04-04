import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';
import { PopupService } from 'src/app/services/popup/popup.service';
declare var CanvasJS;

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit, OnDestroy {

  users = [];

  constructor(private socketService:SocketService) { }

  ngOnInit(): void {
      this.socketService.initializeWebSocketConnection();
      this.socketService.userList.subscribe(userList => {
        this.users = userList;
      });
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

}
