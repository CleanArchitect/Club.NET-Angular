import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'club-portal',
    imports: [RouterModule, MatIconModule, MatToolbarModule, MatButtonModule],
    templateUrl: './club.html',
    styleUrl: './club.scss'
})
export class ClubComponent { }
