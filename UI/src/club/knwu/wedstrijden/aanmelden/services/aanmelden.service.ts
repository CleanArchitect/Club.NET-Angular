import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, map } from 'rxjs';
import { CONFIG } from '../../../../shared/config/config';
import { IKnwuLid, IKnwuWedstrijdDeelnemer } from '../models/wedstrijd';

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdAanmeldenService {
    private http = inject(HttpClient);
    private config = inject(CONFIG);

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
}