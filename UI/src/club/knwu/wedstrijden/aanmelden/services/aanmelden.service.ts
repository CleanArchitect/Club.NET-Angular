import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import saveAs from 'file-saver';
import { Guid } from 'guid-typescript';
import { Observable, map } from 'rxjs';
import { CONFIG } from '../../../../shared/config/config';
import { IKnwuLid, IKnwuWedstrijd, IKnwuWedstrijdCategorie, IKnwuWedstrijdDeelnemer } from '../models/wedstrijd';

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdService {
    private http = inject(HttpClient);
    private config = inject(CONFIG);

    getOverzicht(): Observable<IKnwuWedstrijd[]> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/overzicht`)
            .pipe(map(response => response.wedstrijden));
    }

    get(id: Guid): Observable<IKnwuWedstrijd> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/${id}`)
            .pipe(map(response => response.wedstrijd));
    }

    aanmelden(id: Guid, categorieId: Guid, lid: IKnwuLid): Observable<IKnwuWedstrijdDeelnemer> {
        return this.http
            .post<any>(`${this.config.api}/knwu/wedstrijd/deelnemer`, {
                wedstrijdId: id,
                categorieId: categorieId,
                knwuId: lid.knwuId,
                uciId: lid.uciId
            })
            .pipe(map(response => response.deelnemer));
    }

    export(wedstrijd: IKnwuWedstrijd, categorie: IKnwuWedstrijdCategorie): Observable<any> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/${wedstrijd.id}/categorie/${categorie.id}/export`, {
                responseType: 'blob' as 'json',
                observe: 'response'
            })
            .pipe(map(response => saveAs(response.body, `export-${wedstrijd.naam}-${categorie.naam}`)));
    }
}