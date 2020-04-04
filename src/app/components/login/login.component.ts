import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PopupService } from 'src/app/services/popup/popup.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private auth:AuthService, private router: Router, private loader:LoaderService, private popup:PopupService) {

  }

  ngOnInit(): void {
    if (this.auth.hasTokenLoaded()) {
      this.router.navigate(['dashboard']);
    }
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [Validators.required])
    });
  }

  login() {
    this.loader.setLoader(true);
    this.auth.login(this.loginForm.value).then(userData => {
      this.loader.setLoader(false);
      this.popup.showMessage('Login Success!', 2000);
      this.router.navigate(['/']);
    }).catch(error => {
      this.loader.setLoader(false);
      this.popup.showMessage('Wrong EmailId or password!', 2000);
      console.log(error);
    });
  }

}
