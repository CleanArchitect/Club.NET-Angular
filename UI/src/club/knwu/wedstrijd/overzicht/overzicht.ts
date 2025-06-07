import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Guid } from 'guid-typescript';
import { KnwuWedstrijdService } from '../aanmelden/aanmelden';
import { KnwuWedstrijdToevoegenDialogComponent } from './toevoegen/toevoegen';

@Component({
    imports: [CommonModule, RouterModule, MatDialogModule, MatListModule, MatMenuModule, MatIconModule, MatRippleModule, MatButtonModule],
    selector: 'club-knwu-wedstrijd-overzicht',
    templateUrl: './overzicht.html',
    styleUrl: './overzicht.scss'
})
export class KnwuWedstrijdOverzichtComponent {
    private service = inject(KnwuWedstrijdService);
    private dialog = inject(MatDialog);

    wedstrijden = this.service.getOverzicht();

    displayedColumns: string[] = ['naam', 'datum'];

    toevoegen(): void {
        this.dialog.open(KnwuWedstrijdToevoegenDialogComponent);
    }

    print(wedstrijdId: Guid, categorieId: Guid): void {
        this.service
            .export(wedstrijdId, categorieId)
            .subscribe();
    }
}