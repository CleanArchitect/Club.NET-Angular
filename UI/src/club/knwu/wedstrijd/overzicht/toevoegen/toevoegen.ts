import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'knwu-wedstrijd-toevoegen-dialog',
    templateUrl: 'toevoegen.html',
    imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnwuWedstrijdToevoegenDialogComponent {

}