import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, map } from 'rxjs';
import { CONFIG } from '../../../shared/config/config';
import { IKnwuWedstrijdDeelnemer } from '../aanmelden/models/wedstrijd';

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdDeelnemerService {
    private http = inject(HttpClient);
    private config = inject(CONFIG);

    updateStartnummer(id: Guid): Observable<IKnwuWedstrijdDeelnemer> {
        return this.http
            .patch<any>(`${this.config.api}/knwu/wedstrijd/deelnemer/${id}`, {})
            .pipe(map(response => response.deelnemer));
    }

    delete(id: Guid): Observable<void> {
        return this.http.delete<any>(`${this.config.api}/knwu/wedstrijd/deelnemer/${id}`);
    }
}