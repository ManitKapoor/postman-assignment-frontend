import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private auth:AuthService, private router: Router, private loader:LoaderService, private popup:PopupService) {

  }

  ngOnInit(): void {
    if (this.auth.hasTokenLoaded()) {
      this.router.navigate(['/']);
    }
    this.registerForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required
      ]),
      'password': new FormControl('', [Validators.required])
    });
  }

  register() {
    this.loader.setLoader(true);
    this.auth.register(this.registerForm.value).then(userData => {
      this.loader.setLoader(false);
      this.router.navigate(['/']);
    }).catch(error => {
      this.loader.setLoader(false);
      this.popup.showMessage('Wrong EmailId or password!', 2000);
      console.log(error);
    });
  }

}
