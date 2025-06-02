import { Component, ViewEncapsulation } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'club-portal',
    imports: [RouterModule, MatToolbarModule, MatButtonModule],
    templateUrl: './club.html',
    styleUrl: './club.scss'
})
export class ClubComponent { }
