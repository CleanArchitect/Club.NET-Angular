import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Guid } from 'guid-typescript';
import { map, Observable } from 'rxjs';
import { CONFIG } from '../../../config/config';

export interface IKnwuWedstrijdDeelnemer {
    id: Guid;
    categorieId: Guid;
    kwnuId: string;
    uciId: string;
    startnummer?: number;
}

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdSDeelnemerService {
    private http = inject(HttpClient);
    private config = inject(CONFIG);

    get(id: Guid): Observable<IKnwuWedstrijdDeelnemer> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/deelnemer/${id}`)
            .pipe(map(response => response.deelnemer));
    }

    updateStartnummer(id: Guid): Observable<IKnwuWedstrijdDeelnemer> {
        return this.http
            .patch<any>(`${this.config.api}/knwu/wedstrijd/deelnemer/${id}`, {})
            .pipe(map(response => response.deelnemer));
    }
}

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdDeelnemerResolver implements Resolve<IKnwuWedstrijdDeelnemer> {
    static routeId = 'deelnemerId';
    static routeDataKey = 'deelnemer';

    private service = inject(KnwuWedstrijdSDeelnemerService);

    resolve(route: ActivatedRouteSnapshot): Observable<IKnwuWedstrijdDeelnemer> {
        return this.service
            .get(Guid.parse(route.paramMap.get(KnwuWedstrijdDeelnemerResolver.routeId)));
    }
}

@Component({
    selector: 'knwu-wedstrijd-deelnemer',
    templateUrl: './deelnemer.html',
    styleUrl: './deelnemer.scss'
})
export class KnwuWedstrijdDeelnemerComponent {
    deelnemer: IKnwuWedstrijdDeelnemer = inject(ActivatedRoute).snapshot.data[KnwuWedstrijdDeelnemerResolver.routeDataKey];
}