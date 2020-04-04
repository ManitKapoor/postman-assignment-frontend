import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
declare var $;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private loader:LoaderService) { }

  ngOnInit(): void {
    $('.loader').fadeOut();
    this.loader.loaderEventEmitter.subscribe(val => {
      if (val) {
        $('.loader').fadeIn();
      } else {
        $('.loader').fadeOut();
      }
    });
  }



}
