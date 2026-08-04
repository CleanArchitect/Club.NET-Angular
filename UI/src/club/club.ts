import { OverlayModule } from '@angular/cdk/overlay';

import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'club-portal',
    templateUrl: 'club.html',
    styleUrl: 'club.scss',
    host: { class: 'club-portal' },
    encapsulation: ViewEncapsulation.None,
    imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, OverlayModule, MatMenuModule]
})
export class ClubComponent {
    // private builder = inject(CleanFormBuilder);

    // private model = {} as IKnwuWedstrijd;

    // form = this.builder.columns(
    //     this.model,
    //     column(
    //         textField('naam', 'Naam'),
    //         group(textField('naam', 'Postcode', { width: 0.6 }), textField('naam', 'Plaats'))),
    //     column(
    //         textField('knwuWedstrijdnummer', 'Nummer', { type: 'number' })),
    //     column(
    //         dateField('datum', 'Datum 2'),
    //         textField('naam', 'Groot', { type: 'textarea' }))
    // );
}
