
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_CARD_CONFIG, MatCardConfig, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { IKnwuLid, IKnwuWedstrijdDeelnemer } from './models/wedstrijd';
import { KnwuWedstrijdAanmeldenDeelnemerStep } from './steps/deelnemer/deelnemer';
import { KnwuWedstrijdAanmeldenLidStep } from "./steps/lid/lid";
import { KnwuWedstrijdAanmeldenWedstrijdStep } from './steps/wedstrijd/wedstrijd';

@Component({
    selector: 'club-knwu-wedstrijd-aanmelder',
    templateUrl: 'aanmelden.html',
    styleUrl: 'aanmelden.scss',
    host: { class: 'club-knwu-wedstrijd-aanmelder' },
    encapsulation: ViewEncapsulation.None,
    providers: [ { provide: MAT_CARD_CONFIG, useValue: { appearance: 'outlined' } as MatCardConfig }],
    imports: [KnwuWedstrijdAanmeldenLidStep, KnwuWedstrijdAanmeldenWedstrijdStep, KnwuWedstrijdAanmeldenDeelnemerStep, MatStepperModule, MatCardModule, MatIconModule, MatButtonModule]
})
export class KnwuWedstrijdAanmelder {
    started = false;
    knwuLid: IKnwuLid;
    deelnemer: IKnwuWedstrijdDeelnemer;

    reset(stepper: MatStepper): void {
        this.started = false;
        this.knwuLid = null;
        this.deelnemer = null;
        stepper.reset();
    }
}