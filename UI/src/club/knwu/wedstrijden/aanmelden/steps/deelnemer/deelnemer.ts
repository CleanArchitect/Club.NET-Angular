
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KnwuWedstrijdDeelnemerService } from '../../../services/deelnemer.service';
import { IKnwuWedstrijdDeelnemer } from '../../models/wedstrijd';

@Component({
    selector: 'knwu-wedstrijd-aanmelden-deelnemer[deelnemer]',
    templateUrl: 'deelnemer.html',
    styleUrl: 'deelnemer.scss',
    imports: [MatCardModule, MatButtonModule, MatIconModule]
})
export class KnwuWedstrijdAanmeldenDeelnemerStep {
    @Input() deelnemer: IKnwuWedstrijdDeelnemer;
    @Output() afronden = new EventEmitter<void>();

    private service = inject(KnwuWedstrijdDeelnemerService);

    updateStartnummer(): void {
        this.service
            .updateStartnummer(this.deelnemer.id)
            .subscribe(deelnemer => Object.assign(this.deelnemer, deelnemer));
    }
}