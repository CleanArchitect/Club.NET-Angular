import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { KnwuWedstrijdService } from '../aanmelden/aanmelden';

@Component({
    imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatRippleModule],
    selector: 'club-knwu-wedstrijd-overzicht',
    templateUrl: './overzicht.html',
    styleUrl: './overzicht.scss'
})
export class KnwuWedstrijdOverzichtComponent {
    private service = inject(KnwuWedstrijdService);

    wedstrijden = this.service.getOverzicht();

    displayedColumns: string[] = ['naam', 'datum'];
}