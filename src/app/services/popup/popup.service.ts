import { Injectable } from '@angular/core';
declare var Materialize;

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  showMessage(message: string,duration: number) {
    Materialize.toast(message, 3000, 'rounded');
  }
  
}
