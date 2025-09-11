import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IKnwuWedstrijdDeelnemer } from '../../models/wedstrijd';

@Component({
    selector: 'knwu-wedstrijd-aanmelden-deelnemer[deelnemer]',
    templateUrl: 'deelnemer.html',
    styleUrl: 'deelnemer.scss',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class KnwuWedstrijdAanmeldenDeelnemerStep {
    @Input() deelnemer: IKnwuWedstrijdDeelnemer;
 }