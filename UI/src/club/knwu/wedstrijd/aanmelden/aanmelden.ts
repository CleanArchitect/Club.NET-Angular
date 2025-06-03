import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Guid } from 'guid-typescript';
import { map, Observable } from 'rxjs';
import { CONFIG } from '../../../config/config';

export interface IKnwuWedstrijdCategorie {
    id: Guid;
    naam: string;
}

export interface IKnwuWedstrijd {
    id: Guid;
    naam: string;
    datum: Date;
    categorieen: IKnwuWedstrijdCategorie[];
}

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdService {
    private http = inject(HttpClient);
    private config = inject(CONFIG);

    getOverzicht(): Observable<IKnwuWedstrijd[]> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/overzicht`)
            .pipe(map(response => response.wedstrijden));
    }

    get(id: Guid): Observable<IKnwuWedstrijd> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/${id}`)
            .pipe(map(response => response.wedstrijd));
    }

    aanmelden(id: Guid, categorieId: Guid, knwuId: Guid, uciId?: Guid): Observable<any> {
        return this.http
            .post<any>(`${this.config.api}/knwu/wedstrijd/${id}/categorie/${categorieId}/deelnemer`, { knwuId, uciId })
            .pipe(map(response => response));
    }
}

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdResolver implements Resolve<IKnwuWedstrijd> {
    static wedstrijdId = 'wedstrijdId';
    static wedstrijd = 'wedstrijd';

    private service = inject(KnwuWedstrijdService);

    resolve(route: ActivatedRouteSnapshot): Observable<IKnwuWedstrijd> {
        return this.service.get(Guid.parse(route.paramMap.get(KnwuWedstrijdResolver.wedstrijdId)));
    }
}

@Component({
    imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, MatTooltipModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ZXingScannerModule],
    selector: 'knwu-wedstrijd-deelnemer-aanmelden',
    templateUrl: './aanmelden.html',
    styleUrl: './aanmelden.scss'
})
export class KnwuWedstrijdAanmeldenComponent {
    private scanTargetControl: AbstractControl;
    private formBuilder = inject(FormBuilder);
    private service = inject(KnwuWedstrijdService);
    
    wedstrijd: IKnwuWedstrijd = inject(ActivatedRoute).snapshot.data[KnwuWedstrijdResolver.wedstrijd];
    selectedCategorie: IKnwuWedstrijdCategorie = this.wedstrijd.categorieen.length === 1 ? this.wedstrijd.categorieen[0] : null;
    deelnemerForm = this.createDeelnemerForm();

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

    private createDeelnemerForm(): FormGroup {
        return this.formBuilder
            .group({
                knwuId: [null, CustomValidators.requiredWhen(form => !form.controls.uciId.value)],
                uciId: [null, CustomValidators.requiredWhen(form => !form.controls.knwuId.value)]
            })
            .withMonitoring();
    }
}

export class CustomValidators {
    static requiredWhen(predicate: (form: FormGroup) => boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const formGroup = control.parent;

            if (!(formGroup instanceof FormGroup))
                return null;

            return predicate(formGroup) ? Validators.required(control) : null;
        };
    }
}

declare module '@angular/forms' {
    interface FormGroup {
        withMonitoring(): FormGroup;
    }
}

FormGroup.prototype.withMonitoring = function (): FormGroup {
    Object.values(this.controls).forEach(control => {
        control.valueChanges.subscribe(() => {
            Object.values(this.controls).forEach(ctrl => ctrl.updateValueAndValidity({ emitEvent: false }));
        });
    });

    return this;
};