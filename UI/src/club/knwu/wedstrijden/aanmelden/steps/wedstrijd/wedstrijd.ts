import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IKnwuLid, IKnwuWedstrijd, IKnwuWedstrijdCategorie, IKnwuWedstrijdDeelnemer } from '../../models/wedstrijd';
import { KnwuWedstrijdService } from '../../services/aanmelden.service';

@Component({
    selector: 'knwu-wedstrijd-aanmelden-wedstrijd[knwuLid]',
    templateUrl: 'wedstrijd.html',
    styleUrl: 'wedstrijd.scss',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class KnwuWedstrijdAanmeldenWedstrijdStep {
    @Input() knwuLid: IKnwuLid;
    @Output() deelnemer = new EventEmitter<IKnwuWedstrijdDeelnemer>();

    private service = inject(KnwuWedstrijdService);

    wedstrijden = this.service.getOverzicht();
    selectedWedstrijd: IKnwuWedstrijd;
    selectedCategorie: IKnwuWedstrijdCategorie;

    bevestigen(): void {
        this.service
            .aanmelden(this.selectedWedstrijd.id, this.selectedCategorie.id, this.knwuLid)
            .subscribe(deelnemer => this.deelnemer.emit(deelnemer));
    }
}