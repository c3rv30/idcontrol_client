import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MatPaginator, MatTableDataSource } from '@angular/material';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AsistenteService } from '../_services/asistente';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exportasis',
  templateUrl: './exportasis.component.html',
  styleUrls: ['./exportasis.component.scss']
})
export class ExportasisComponent implements AfterViewInit, OnInit {
  public form: FormGroup;

  currentUser: any;
  equipo: string;

  // progress bar
  loadingProgressBar: boolean;
  //
  resultMessage: boolean;
  
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
  }

  ngAfterViewInit(): void {
    
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
        inputRut: [null, Validators.compose([Validators.required])],
        fec: ['', Validators.compose([])],
      });
      if (this.currentUser.roleUser === 'ROLE_USER') {
          this.equipo = this.currentUser.equipo.name;
      }
    this.resultMessage = false;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
}

  
}