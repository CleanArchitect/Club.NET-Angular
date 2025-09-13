import { CommonModule, KeyValue } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
    selector: 'mat-error[errors]',
    templateUrl: 'errors.html',
    imports: [CommonModule]
})
export class MatErrorErrors implements AfterViewInit {
    private matFormField = inject(MatFormField);
    private cdr = inject(ChangeDetectorRef);

    control: AbstractControl;

    ngAfterViewInit() {
        this.control = this.matFormField?._control?.ngControl.control;
        this.cdr.detectChanges();
    }

    errorMessage(keyValue: KeyValue<string, any>): string {
        switch (keyValue.key) {
            case 'required': return 'Dit veld is verplicht';
            default: return keyValue.value?.toString();
        }
    }
}