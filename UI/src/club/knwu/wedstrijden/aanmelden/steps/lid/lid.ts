
import { Component, EventEmitter, inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatErrorErrors } from '../../../../../shared/directives/errors/errors';
import { IKnwuLid } from '../../models/wedstrijd';

@Component({
    selector: 'knwu-wedstrijd-aanmelden-lid',
    templateUrl: 'lid.html',
    styleUrl: 'lid.scss',
    imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatErrorErrors, ZXingScannerModule]
})
export class KnwuWedstrijdAanmeldenLidStep implements OnDestroy {
    @ViewChild(ZXingScannerComponent) scanner: ZXingScannerComponent;
    @Output() knwuLid = new EventEmitter<IKnwuLid>();
    @Output() annuleren = new EventEmitter<void>();

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
        this.scanControlName = null;
        this.scanEnabled = false;
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

    ngOnDestroy(): void {
        this.scanner.reset();
    }


}