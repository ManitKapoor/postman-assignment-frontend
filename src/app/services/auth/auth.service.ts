import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
declare var firebase;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  idToken = null;
  userDetails = null;
  localKey = "postman-assigment-local-key#78e9asd";

  getToken() {
      return this.idToken;
  }

  @Output() userData = new EventEmitter<any>();

  constructor(private router: Router) {
    this.loadLocalCreds();
  }

  loadLocalCreds() {
    let data =  window.localStorage.getItem(this.localKey);
    if (data != null) {
      let firebaseAuthDetails = JSON.parse(data);
      this.userDetails = firebaseAuthDetails.userDetails;
      this.idToken = firebaseAuthDetails.idToken;
    }
  }

  hasTokenLoaded() {
    return (this.idToken != null);
  }
 
  isAuthenticated() {
    return new Promise((resolve,reject) => {
          if (this.hasTokenLoaded()) {
            resolve(true);
          }
           let userCredentials = firebase.auth().currentUser;
            if (userCredentials == null) {
              this.resetCredentials();
              reject(false);
            }
            this.loadUserDetails(userCredentials);
            userCredentials.getIdToken(true).then((token) => {
              this.idToken = token;
              window.localStorage.setItem(this.localKey, JSON.stringify({
                userDetails: this.userDetails,
                idToken: this.idToken
              }));
              this.userData.emit('login');
              resolve(true);
            }).catch((err) => {
              this.resetCredentials();
              reject(false);
            });

    });
  }

  getUserDetails(): User {
    return this.userDetails;
  }

  loadUserDetails(userCredentials) {
    if (userCredentials) {
      this.userDetails = new User();
      this.userDetails.name = userCredentials.email.split("@")[0];
      this.userDetails.role = "assignment";
      this.userDetails.email = userCredentials.email;
      this.userDetails.imageUrl = userCredentials.email[0].toLocaleUpperCase();
    }
  }

  login(loginData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        this.loadUserDetails(res.user);
        res.user.getIdToken(true).then((token) => {
          this.idToken = token;
          window.localStorage.setItem(this.localKey, JSON.stringify({
            userDetails: this.userDetails,
            idToken: this.idToken
          }));
          this.userData.emit('login');
          resolve(res);
        }).catch((err) => reject(err));
      }).catch(err => reject(err));
    });
  }

  resetCredentials() {
    this.userDetails = null;
    this.idToken = null;
    window.localStorage.removeItem(this.localKey);
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.resetCredentials();
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.resetCredentials();
      this.router.navigate(['/login']);
    });
  }

  register(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
}
