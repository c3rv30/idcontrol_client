import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MatPaginator, MatTableDataSource } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AsistenteService } from '../_services/asistente';
import {HttpClient} from '@angular/common/http';

export interface Element {

    rut: string;
    equipo: string;
    fecha: string;
}

@Component({
    selector: 'app-asistentes',
    templateUrl: './asistentes.component.html',
    styleUrls: ['./asistentes.component.scss']
})
export class AsistentesComponent implements AfterViewInit, OnInit {
    /* pagination table */
    ELEMENT_DATA: Element[] = [];
    displayedColumns = ['rut', 'equipo', 'fecha'];
    dataSource;

    options: FormGroup;
    public currentUser: any;
    public equipo: string;
    public rut: string;
    public fec: string;

    // For form validator
    email = new FormControl('', [Validators.required, Validators.email]);

    // Sufix and prefix
    hide = true;

    // this is for the start date
    startDate = new Date(1990, 0, 1);

    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);

    // Datepicker selected value
    date = new FormControl(new Date());
    serializedDate = new FormControl(new Date().toISOString());

    // Datepicker input and change event

    events: string[] = [];

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        this.events.push(`${type}: ${event.value}`);
    }

    myFilter = (d: Date): boolean => {
        const day = d.getDay();
        // Prevent Saturday and Sunday from being selected.
        return day !== 0 && day !== 6;
        // tslint:disable-next-line:semicolon
    };

    constructor(fb: FormBuilder, private adapter: DateAdapter<any>,
                private http: HttpClient,
                private _asistService: AsistenteService,
                breakpointObserver: BreakpointObserver) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto'
        });
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['rut', 'equipo', 'fecha'] :
                ['rut', 'equipo', 'fecha'];
        });
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit(): void {
        this.getByRut();
    }

    ngOnInit(): void {
        if (this.currentUser.roleUser === 'ROLE_USER') {
            this.equipo = this.currentUser.equipo.name;

        }
    }

    french() {
        this.adapter.setLocale('fr');
    }

    getErrorMessage() {
        return this.email.hasError('required')
            ? 'You must enter a value'
            : this.email.hasError('email')
                ? 'Not a valid email'
                : '';
    }

    public async getByRut() {
        this.rut = '91365596';
        this.equipo = 'San Antonio Unido';
        this._asistService.getByRut( this.rut, this.equipo, this.fec )
            .subscribe((data: Element[]) => {
                this.ELEMENT_DATA = data;
                this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
            });
    }
}
