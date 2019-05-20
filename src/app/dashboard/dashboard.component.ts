import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AsistenteService } from '../_services/asistente';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {
    public currentUser: any;
    public equipo: string;
    public barChartData: any[];

    // Chart js
    subtitle: string;
    constructor(private http: HttpClient, private _asistService: AsistenteService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.subtitle = 'This is chart page.';
    }

    // This is line chart
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        barThickness: 10
    };

    public barChartLabels: string[] = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ];

    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartColors: Array<any> = [
        { backgroundColor: '#1976d2' },
        { backgroundColor: '#26dad2' }
    ];

    // Pie
    public pieChartLabels: string[] = [
        'Masculino',
        'Femenino',
        'No Asignado'
    ];
    public pieChartData: number[] = [500, 200, 100];
    public pieChartType = 'pie';

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            Math.random() * 100,
            56,
            Math.random() * 100,
            40
        ];
        // const clone = JSON.parse(JSON.stringify(this.barChartData));
        // clone[0].data = data;
        // this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    ngOnInit() {
        if (this.currentUser.roleUser === 'ROLE_USER') {
            this.equipo = this.currentUser.equipo.name;
            this.getAllAsist();
        }
    }

    ngAfterViewInit() {
        // Sparkline chart
        const sparklineLogin = function() {
            // spark count
            (<any>$('.spark-count')).sparkline(
                [4, 5, 0, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9],
                {
                    type: 'bar',
                    width: '100%',
                    height: '70',
                    barWidth: '2',
                    resize: true,
                    barSpacing: '6',
                    barColor: 'rgba(255, 255, 255, 0.3)'
                }
            );
        };
        let sparkResize;
        (<any>$(window)).resize(function(e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();
    }

    public getAllAsist() {
        const lasTyear = [];
        const currentTyear = [];
        this._asistService.getAsisByEquipo( this.equipo )
            .subscribe(result => {
                result.lastYearArray.forEach(function(elem) {
                    lasTyear.push(elem.count);
                });
                result.currentYearArray.forEach(function(elem) {
                    currentTyear.push(elem.count);
                });
            });
        this.barChartData = [
            { data: lasTyear, label: '2018' },
            { data: currentTyear, label: '2019' }
        ];
        // [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86]
    }
}
