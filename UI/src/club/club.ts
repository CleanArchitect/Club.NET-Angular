import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'club-portal',
    templateUrl: 'club.html',
    styleUrl: 'club.scss',
    host: { class: 'club-portal' },
    encapsulation: ViewEncapsulation.None,
    imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule]
})
export class ClubComponent {}
