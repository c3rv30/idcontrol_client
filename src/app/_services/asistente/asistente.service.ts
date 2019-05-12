import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Asistente } from '../../_models/asistente';
import { map } from 'rxjs/operators';

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


    /*
    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

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
