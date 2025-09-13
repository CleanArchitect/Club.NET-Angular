import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IKnwuWedstrijd, IKnwuWedstrijdCategorie } from '../../../models/wedstrijd';
import { KnwuWedstrijdService } from '../../../services/wedstrijd.service';
import { IKnwuLid, IKnwuWedstrijdDeelnemer } from '../../models/wedstrijd';
import { KnwuWedstrijdAanmeldenService } from '../../services/aanmelden.service';

@Component({
    selector: 'knwu-wedstrijd-aanmelden-wedstrijd[knwuLid]',
    templateUrl: 'wedstrijd.html',
    styleUrl: 'wedstrijd.scss',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule]
})
export class KnwuWedstrijdAanmeldenWedstrijdStep {
    @Input() knwuLid: IKnwuLid;
    @Output() deelnemer = new EventEmitter<IKnwuWedstrijdDeelnemer>();

    private wedstrijdService = inject(KnwuWedstrijdService);
    private service = inject(KnwuWedstrijdAanmeldenService);

    wedstrijden = this.wedstrijdService.overzicht();
    selectedWedstrijd: IKnwuWedstrijd;
    selectedCategorie: IKnwuWedstrijdCategorie;

    bevestigen(): void {
        this.service
            .aanmelden(this.selectedWedstrijd.id, this.selectedCategorie.id, this.knwuLid)
            .subscribe(deelnemer => this.deelnemer.emit(deelnemer));
    }
}