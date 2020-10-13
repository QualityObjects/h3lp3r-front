import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { OperationsByDateRange } from '@app/domain/stats';
import { StatsService } from '@app/services/stats-service';
import { Chart } from 'chart.js';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  welcomeMessage: string = '';
  operationData: OperationsByDateRange;
  since: string = DateTime.local().minus({ days: 1 }).toISO();
  interval: string = "10m";
  chartIntervalId: number;
  operationSinceChart: Chart;
  constructor(
    private statsService: StatsService,
    @Inject(DOCUMENT) private document
  ) { }

  ngOnDestroy(): void {
    clearInterval(this.chartIntervalId);
  }

  ngOnInit() {
    this.createChartOperationsSince();
    this.refreshOperationSince();
    this.chartIntervalId = setInterval(() => {
      this.refreshOperationSince();
    }, 10000);
  }

  refreshOperationSince() {
    this.since = DateTime.local().minus({ days: 1 }).toISO({includeOffset: false});
    console.log(`Since: ${this.since}`);
    this.statsService.getStats(this.since, this.interval).subscribe(data => {
      this.operationData = data;
      this.operationSinceChart.data.datasets[0].data = this.operationData.timeline.filter(tl => !!tl.count).map(tl => {
        const dt = DateTime.fromISO(`${tl.initRange}`, {zone: 'UTC'}).toLocal();
        return {
          x: dt.toISO(),
          y: tl.count
        }
      });
      this.operationSinceChart.update();
    });
  }

  createChartOperationsSince() {
    this.operationSinceChart = new Chart('operationsSinceChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Operations',
            fill: false,
            data: [],
            backgroundColor: "darkblue",
            borderColor: "#aaaaff"
          }
        ]
      },
      options: {
        title: {
          text: "Operations by time"
        },  
        tooltips: {
          enabled: true,
          callbacks: {
            title: (p) => {
              const dt = DateTime.fromISO(`${p[0].xLabel}`);
              return `${dt.toFormat('HH:mm')} - ${dt.plus({minutes: 10}).toFormat('HH:mm')}`;
            }
          }
        },
        legend: {
          display: false,
        },
        scales: {          
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Operations'
            }
          }],
          xAxes: [{
            type: 'time',            
            time: {              
              unit: 'minute',
              displayFormats: {
                'minute': 'HH:mm'
              }
            },            
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }]
        }
      }
    });
  }


}

