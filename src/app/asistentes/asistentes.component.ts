import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MatPaginator, MatTableDataSource } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AsistenteService } from '../_services/asistente';
import { HttpClient } from '@angular/common/http';

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
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public form: FormGroup;

    /* pagination table */
    ELEMENT_DATA: Element[] = [];
    displayedColumns = ['rut', 'equipo', 'fecha'];
    dataSource;

    currentUser: any;
    equipo: string;

    // progress bar
    loadingProgressBar: boolean;
    // table
    loadingTable: boolean;

    // For form validator
    // inputRut = new FormControl('', [Validators.required]);

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

    constructor(
        private fb: FormBuilder,
        private adapter: DateAdapter<any>,
        private http: HttpClient,
        private _asistService: AsistenteService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       // this.form = fb.group({
       //     hideRequired: false,
       //     floatLabel: 'auto'
       // });
        breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
            this.displayedColumns = result.matches ?
                ['rut', 'equipo', 'fecha'] :
                ['rut', 'equipo', 'fecha'];
        });
    }

    ngAfterViewInit(): void {
        // this.getByRut();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            inputRut: [null, Validators.compose([Validators.required])],
            fec: [null, Validators.compose([])],
        });
        if (this.currentUser.roleUser === 'ROLE_USER') {
            this.equipo = this.currentUser.equipo.name;
        }
        this.loadingTable = false;
    }

    onSubmit() {
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.getByRut();
    }

    // convenience getter for easy acces to form fields
    get f() { return this.form.controls; }
    /*
    getErrorMessage() {
        return this.inputRut.hasError('required')
            ? 'You must enter a value'
            : this.inputRut.hasError('rut')
                ? 'Not a valid rut'
                : '';
    }
    */
    public getByRut() {
        this.loadingProgressBar = true;
        // this.rut = '91365596';
        // this.equipo = 'San Antonio Unido';
        
        console.log('Fecha DatePicker: ', this.f.fec.value);

        this._asistService.getByRut( this.f.inputRut.value, this.equipo, '2019-06-03' )
            .subscribe((data: Element[]) => {
                if (data.length >= 0) {
                    this.ELEMENT_DATA = data;
                    this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
                    this.dataSource.paginator = this.paginator;
                    this.loadingProgressBar = false;
                    this.loadingTable = true;
                } else {
                    this.loadingProgressBar = false;
                    console.log('No se encontraron registros de asistencia.');
                }
            });
    }

}
