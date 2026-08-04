
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from "@angular/material/input";
import { tap } from 'rxjs';
import { MatErrorErrors } from '../../../../shared/directives/errors/errors';
import { IKnwuWedstrijd } from '../../models/wedstrijd';
import { KnwuWedstrijdService } from '../../services/wedstrijd.service';

@Component({
    selector: 'knwu-wedstrijd-toevoegen',
    templateUrl: 'toevoegen.html',
    styleUrl: 'toevoegen.scss',
    providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } as MatFormFieldDefaultOptions}],
    imports: [ReactiveFormsModule, MatErrorErrors, MatFormFieldModule, MatDialogModule, MatInput, MatDatepickerModule, MatIconModule, MatButtonModule]
})
export class KnwuWedstrijdToevoegen {
    @Output() toegevoegd = new EventEmitter<IKnwuWedstrijd>();

    private service = inject(KnwuWedstrijdService);
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef);

    form = this.createForm();

    get categorieen(): FormArray {
        return this.form.get('categorieen') as FormArray;
    }

    private get newStartNummer(): number {
        return Number(this.categorieen.at(this.categorieen.length -1).value.startnummerEind) + 1;
    }

    toevoegen(): void {
        if (!this.form.valid)
            return this.form.markAllAsTouched();

        this.service
            .toevoegen(Object.assign({}, this.form.value))
            .pipe(tap(() => this.dialogRef.close()))
            .subscribe(wedstrijd => this.toegevoegd.emit(wedstrijd));
    }

    addCategorie(): void {
        this.categorieen
            .push(this.createCategorieForm(this.newStartNummer));
    }

    removeCategorie(index: number): void {
        this.categorieen.removeAt(index);
    }

    private createForm(): FormGroup {
        return this.fb.group({
            knwuWedstrijdnummer: [null, Validators.required],
            naam: [null, Validators.required],
            datum: [null, Validators.required],
            categorieen: this.fb.array([
                this.createCategorieForm()
            ])
        });
    }

    private createCategorieForm(begin: number = 1, eind: number = begin + 49): FormGroup {
        return this.fb.group({
            naam: [null, Validators.required],
            startnummerBegin: [begin, Validators.required],
            startnummerEind: [eind, Validators.required]
        });
    }
}