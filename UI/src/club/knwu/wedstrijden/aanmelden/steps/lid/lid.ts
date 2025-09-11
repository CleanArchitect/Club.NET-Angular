import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { IKnwuLid } from '../../models/wedstrijd';

@Component({
    selector: 'knwu-wedstrijd-aanmelden-lid',
    templateUrl: 'lid.html',
    styleUrl: 'lid.scss',
    imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ZXingScannerModule]
})
export class KnwuWedstrijdAanmeldenLidStep {
    @Output() knwuLid = new EventEmitter<IKnwuLid>();

    form = inject(FormBuilder).group({
        knwuId: [null],
        uciId: [null]
    });

    scanEnabled = false;
    scanControlName: string;

    enableScan(controlName: string): void {
        this.scanEnabled = true;
        this.scanControlName = controlName;
    }

    disableScan(): void {
        this.scanEnabled = false;
        this.scanControlName = null;
    }

    scanSuccess(scanResult: string): void {
        this.form.get(this.scanControlName).setValue(scanResult);
        this.scanEnabled = false;
    }

    aanmelden(): void {
        if (!this.form.valid)
            return this.form.markAllAsTouched();

        this.knwuLid.emit(Object.assign({} as IKnwuLid, this.form.value));
    }
}