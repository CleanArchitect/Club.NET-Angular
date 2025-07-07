import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'knwu-wedstrijd-toevoegen-dialog',
    templateUrl: 'toevoegen.html',
    styleUrl: 'toevoegen.scss',
    imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnwuWedstrijdToevoegenDialogComponent {
    private fb = inject(FormBuilder);

    form = this.createForm();

    get categories(): FormArray<FormGroup> {
        return this.form.controls.categorieen as FormArray<FormGroup>;
    }

    addCategorie() {
        const lastCategorie = this.categories.at(this.categories.length - 1);
        this.categories.push(this.createCategorieForm(this.categories.length + 1, lastCategorie.value.startnummerEind + 1));
    }

    removeCategory(index: number) {
        this.categories.removeAt(index);
    }

    private createForm(): FormGroup {
        return this.fb.group({
            naam: [null, Validators.required],
            datum: [null, Validators.required],
            categorieen: this.fb.array([this.createCategorieForm()])
        });
    }

    private createCategorieForm(categorieNummer: number = 1, startnummerBegin = 1): FormGroup {
        return this.fb.group({
            naam: [`Categorie ${categorieNummer}`, Validators.required],
            startnummerBegin: [startnummerBegin, Validators.required],
            startnummerEind: [startnummerBegin + 49, Validators.required]
        });
    }
}