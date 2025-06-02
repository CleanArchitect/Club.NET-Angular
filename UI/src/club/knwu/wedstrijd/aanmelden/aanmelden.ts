import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Guid } from 'guid-typescript';
import { map, Observable } from 'rxjs';
import { CONFIG } from '../../../config/club.config';

// export interface ICreateKnwuWedstrijdCategorieDeelnemerInput {
//     wedstrijdId: Guid;
//     categorieId: Guid;
//     knwuId: string;
//     UciId: string;
// }

export interface IKnwuWedstrijdCategorie {
    id: Guid;
    naam: string;
}

export interface IKnwuWedstrijd {
    id: Guid;
    naam: string;
    categorieen: IKnwuWedstrijdCategorie[];
}

@Injectable()
export class KnwuWedstrijdService {
    private http = inject(HttpClient);
    private config = inject(CONFIG);

    get(): Observable<IKnwuWedstrijd[]> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/overzicht`)
            .pipe(map(response => response.wedstrijden));
    }
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, MatTooltipModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ZXingScannerModule],
    selector: 'knwu-wedstrijd-deelnemer-aanmelden',
    templateUrl: './aanmelden.html',
    styleUrl: './aanmelden.scss',
    providers: [KnwuWedstrijdService]
})
export class KnwuWedstrijdAanmelden {
    private scanTargetControl: AbstractControl;
    private formBuilder = inject(FormBuilder);
    private service = inject(KnwuWedstrijdService);

    wedstrijden = this.service.get();

    // formWedstrijd = this.formBuilder.group({ wedstrijdId: [null, Validators.required] });
    // formCategorie = this.formBuilder.group({ categorieId: [null, Validators.required] });
    selectedWedstrijd: IKnwuWedstrijd;
    selectedCategorie: IKnwuWedstrijdCategorie;
    deelnemerForm = this.formBuilder.group({
        knwuId: [null, CustomValidators.requiredWhen(form => !form.controls.uciId.value)],
        uciId: [null, CustomValidators.requiredWhen(form => !form.controls.knwuId.value)],
    });

    scan = false;

    enableScan(scanTargetControlName: string): void {
        this.scanTargetControl = this.deelnemerForm.get(scanTargetControlName);
        this.scan = true;
    }

    scanSuccess(result: string, stepper: MatStepper): void {
        this.scanTargetControl.setValue(result);
        this.scan = false;
        setTimeout(() => stepper.next(), 800);
    }

    register(): void {
        // if (!this.form.valid)
        //     return this.form.markAllAsTouched();
    }

    private createForm(): FormGroup {
        return this.formBuilder.group({
            wedstrijd: [null, Validators.required],
            categorie: [null, Validators.required],
            knwu: [null, CustomValidators.requiredWhen(form => !form.controls.uci.value)],
            uci: [null, CustomValidators.requiredWhen(form => !form.controls.knwu.value)],
        })
    }
}

export class CustomValidators {
    static requiredWhen(predicate: (form: FormGroup) => boolean): ValidatorFn {
        return (control: AbstractControl) => {
            const parent = control.parent;

            if (!control.value || !(parent instanceof FormGroup))
                return null;

            return predicate(parent) ? Validators.required(control) : null;
        };
    }
}