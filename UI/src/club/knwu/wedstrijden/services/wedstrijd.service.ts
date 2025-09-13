import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import saveAs from 'file-saver';
import { Guid } from 'guid-typescript';
import { map, Observable } from 'rxjs';
import { CONFIG } from '../../../shared/config/config';
import { IKnwuWedstrijd, IKnwuWedstrijdCategorie, IKnwuWedstrijdCreate } from '../models/wedstrijd';

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdService {
    private http = inject(HttpClient);
    private config = inject(CONFIG);

    overzicht(): Observable<IKnwuWedstrijd[]> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/overzicht`)
            .pipe(map(response => response.wedstrijden));
    }

    toevoegen(wedstrijd: IKnwuWedstrijdCreate): Observable<IKnwuWedstrijd> {
        return this.http.post<any>(`${this.config.api}/knwu/wedstrijd`, wedstrijd);
    }

    get(id: Guid): Observable<IKnwuWedstrijd> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/${id}`)
            .pipe(map(response => response.wedstrijd));
    }

    export(wedstrijd: IKnwuWedstrijd, categorie: IKnwuWedstrijdCategorie): Observable<any> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/${wedstrijd.id}/categorie/${categorie.id}/export`, {
                responseType: 'blob' as 'json',
                observe: 'response'
            })
            .pipe(map(response => saveAs(response.body, `export-${wedstrijd.naam}-${categorie.naam}`)));
    }

    delete(id: Guid): Observable<void> {
        return this.http.delete<any>(`${this.config.api}/knwu/wedstrijd/${id}`);
    }
}