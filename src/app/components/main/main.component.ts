import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
declare var CanvasJS;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.setLoader(true);
    setTimeout(() => {
      var chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: 'Mock Chart Data'
        },
        axisY: {
          includeZero: false
        },
        data: this.getData()
      });
      setTimeout(() => {
        chart.render();
        this.loader.setLoader(false);
      }, 50);
    }, 50);
  }

  getData() {
    return [
      {
        type: 'line',
        dataPoints: [
          { y: 450 },
          { y: 414 },
          {
            y: 520
          },
          { y: 460 },
          { y: 450 },
          { y: 500 },
          { y: 480 },
          { y: 480 },
          {
            y: 410
          },
          { y: 500 },
          { y: 480 },
          { y: 510 }
        ]
      }
    ];
  }

}
