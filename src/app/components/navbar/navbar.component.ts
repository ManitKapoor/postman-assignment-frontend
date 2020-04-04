import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userData: User;
  constructor(public auth:AuthService) {
    if (this.auth.hasTokenLoaded()) {
      this.userData = this.auth.getUserDetails();
      setTimeout(() => $('.button-collapse').sideNav({
        edge: 'right', 
        closeOnClick: true
      }), 100);
    }
  }

  ngOnInit(): void {
    this.auth.userData.subscribe( (userStatus:string) => {
      if (userStatus == "login") {
        setTimeout(() => $('.button-collapse').sideNav({
          edge: 'right', 
          closeOnClick: true
        }), 100);
        this.userData = this.auth.getUserDetails(); 
      }
    });
  }

  logout() {
    this.auth.logout();
  }

}
