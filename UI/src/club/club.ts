import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { IKnwuWedstrijd } from './knwu/wedstrijden/models/wedstrijd';
import { CleanFormComponent } from './shared/form/form';
import { column } from './shared/form/models/column';
import { date } from './shared/form/models/fields/date';
import { group } from './shared/form/models/fields/field';
import { text } from './shared/form/models/fields/text';
import { CleanFormBuilder } from './shared/form/services/form-builder.service';

@Component({
    selector: 'club-portal',
    templateUrl: 'club.html',
    styleUrl: 'club.scss',
    host: { class: 'club-portal' },
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, CleanFormComponent]
})
export class ClubComponent {
    private builder = inject(CleanFormBuilder);

    private model = {} as IKnwuWedstrijd;

    form = this.builder.columns(
        this.model,
        column(
            text('naam', 'Naam'),
            group(text('naam', 'Postcode', { width: 0.6 }), text('naam', 'Plaats'))
        ),
        column(text('knwuWedstrijdnummer', 'Nummer', { type: 'number' })),
        column(
            date('datum', 'Datum 2'),
            text('naam', 'Groot', { type: 'textarea' })
        )
    );

    // async ngOnInit(): Promise<void> {
    //     this.stapControls = await Promise.all(
    //         this.stappen.map(async stap => ({
    //             stap,
    //             control: await this.createStapControl(stap)
    //         }))
    //     );
    // }

    // private async createStapControl(stap: IStap): Promise<FormGroup> {
    //     return this.fb.group({
    //         gebruikers: [stap.gebruikers ?? await firstValueFrom(this.getGebruikers(stap.type)), Validators.required]
    //     });
    // }
}
