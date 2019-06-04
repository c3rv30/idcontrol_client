import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Asistente } from '../../_models/asistente';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AsistenteService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Asistente[]>(`${environment.apiUrl}/asiscounts`);
    }

    getAsisByEquipo(equipo: string) {
        return this.http.post<any>(`${environment.apiUrl}/asiscounts`, { equipo })
            .pipe(map( res => {
                return res;
            }));
    }

    getByRut(rut: string, equipo: string, fec?: string): Observable<any> {
        return this.http.post<Element[]>(`${environment.apiUrl}/getasis`, { rut, equipo, fec });
    }

    getTotAsisCurrentYear(equipo: string) {
        return this.http.post(`${environment.apiUrl}/getasisyear`, { equipo });
    }

    getTotAsis(equipo: string) {
        return this.http.post(`${environment.apiUrl}/getallasis`, { equipo });
    }

    /* current month */
    getTotAsistMonth(equipo: string) {
        return this.http.post(`${environment.apiUrl}/getasismonth`, { equipo });
    }

    /*
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
    */
}


export interface Element {
    _id: string;
    rut: string;
    equipo: string;
    fecha: string;
}
