import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, take } from 'rxjs';
import { CleanTableColumn, CleanTableColumnArray, CleanTableColumnDate, CleanTableColumnText, CleanTableModule, ICleanTableConfig } from '../../../shared/table';
import { IKnwuWedstrijdDeelnemer } from '../aanmelden/models/wedstrijd';
import { IKnwuWedstrijd, IKnwuWedstrijdCategorie } from '../models/wedstrijd';
import { KnwuWedstrijdDeelnemerService } from '../services/deelnemer.service';
import { KnwuWedstrijdService } from '../services/wedstrijd.service';
import { KnwuWedstrijdToevoegen } from './toevoegen/toevoegen';

@Component({
    selector: 'knwu-wedstrijd-administratie',
    templateUrl: 'administratie.html',
    styleUrl: 'administratie.scss',
    imports: [CommonModule, CleanTableModule, MatButtonModule, MatIconModule, MatTooltipModule]
})
export class KnwuWedstrijdAdministratie implements OnInit {
    private service = inject(KnwuWedstrijdService);
    private deelnemerService = inject(KnwuWedstrijdDeelnemerService);
    private dialog = inject(MatDialog);

    wedstrijden: Observable<IKnwuWedstrijd[]>;

    wedstrijdConfig: ICleanTableConfig = {
        enableFilter: true,
        actions: { delete: (wedstrijd: IKnwuWedstrijd) => this.service.delete(wedstrijd.id).subscribe(() => this.ngOnInit()) }
    };
    wedstrijdColumns: CleanTableColumn<IKnwuWedstrijd>[] = [
        new CleanTableColumnText(wedstrijd => wedstrijd.knwuWedstrijdnummer, 'KNWU-Nummer'),
        new CleanTableColumnText(wedstrijd => wedstrijd.naam, 'Naam'),
        new CleanTableColumnDate(wedstrijd => wedstrijd.datum, 'Datum'),
        new CleanTableColumnArray(wedstrijd => wedstrijd.categorieen, 'Categorieën', 'chips', { bulletIcon: 'patient_list', displayWith: (categorie: IKnwuWedstrijdCategorie) => categorie.naam, itemClick: (wedstrijd: IKnwuWedstrijd, categorie: IKnwuWedstrijdCategorie) => this.select(wedstrijd, categorie) })
    ];

    selectedWedstrijd: IKnwuWedstrijd;
    selectedCategorie: IKnwuWedstrijdCategorie;

    deelnemerConfig: ICleanTableConfig = {
        enableExport: true,
        enableFilter: true,
        pagination: { pageSize: 25 },
        actions: {
            delete: (deelnemer: IKnwuWedstrijdDeelnemer) => this.deleteDeelnemer(deelnemer),
            rowActions: [{ icon: 'refresh', tooltip: 'Nieuw startnummer', click: (deelnemer: IKnwuWedstrijdDeelnemer) => this.updateDeelnemer(deelnemer) }]
        }
    };
    deelnemerColumns: CleanTableColumn<IKnwuWedstrijdDeelnemer>[] = [
        new CleanTableColumnText(deelnemer => deelnemer.startnummer, 'Nummer'),
        new CleanTableColumnText(deelnemer => deelnemer.knwuId, 'KNWU-ID'),
        new CleanTableColumnText(deelnemer => deelnemer.uciId, 'UCI-ID'),
    ];

    ngOnInit(): void {
        this.deselect();
        this.wedstrijden = this.service.overzicht();
    }

    toevoegen(): void {
        this.dialog
            .open(KnwuWedstrijdToevoegen, { minWidth: 400 }).componentInstance
            .toegevoegd
            .pipe(take(1))
            .subscribe(() => this.ngOnInit());
    }

    select(wedstrijd: IKnwuWedstrijd, categorie: IKnwuWedstrijdCategorie): void {
        this.selectedWedstrijd = wedstrijd;
        this.selectedCategorie = categorie;
    }

    deselect(): void {
        this.selectedWedstrijd = null;
        this.selectedCategorie = null;
    }

    private updateDeelnemer(updateDeelnemer: IKnwuWedstrijdDeelnemer): void {
        this.deelnemerService
            .updateStartnummer(updateDeelnemer.id)
            .subscribe(deelnemer => Object.assign(updateDeelnemer, deelnemer));
    }

    private deleteDeelnemer(deleteDeelnemer: IKnwuWedstrijdDeelnemer): void {
        this.deelnemerService
            .delete(deleteDeelnemer.id)
            .subscribe(() => this.selectedCategorie.deelnemers = this.selectedCategorie.deelnemers
                .filter(deelnemer => deelnemer.id !== deleteDeelnemer.id))
    }
}
