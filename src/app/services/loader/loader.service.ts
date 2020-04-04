import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  @Output() loaderEventEmitter = new EventEmitter<any>();

  constructor() { }

  setLoader(value: boolean) {
    this.loaderEventEmitter.emit(value);
  }
}
