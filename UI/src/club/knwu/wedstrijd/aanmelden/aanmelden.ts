import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
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
import { saveAs } from 'file-saver';
import { Guid } from 'guid-typescript';
import { map, Observable, tap } from 'rxjs';
import { CONFIG } from '../../../config/config';
import { IKnwuWedstrijdDeelnemer, KnwuWedstrijdSDeelnemerService } from '../deelnemer/deelnemer';

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

    aanmelden(id: Guid, categorieId: Guid, deelnemer: { knwuId: string, uciId: string }): Observable<IKnwuWedstrijdDeelnemer> {
        return this.http
            .post<any>(`${this.config.api}/knwu/wedstrijd/deelnemer`, {
                wedstrijdId: id,
                categorieId: categorieId,
                knwuId: deelnemer.knwuId,
                uciId: deelnemer.uciId
            })
            .pipe(map(response => response.deelnemer));
    }

    export(id: Guid, categorieId: Guid): Observable<any> {
        return this.http
            .get<any>(`${this.config.api}/knwu/wedstrijd/${id}/categorie/${categorieId}/export`, {
                responseType: 'blob' as 'json',
                observe: 'response'
            })
            .pipe(map(response => saveAs(response.body, this.getFileName(response))));
    }

    private getFileName(response: HttpResponseBase): string {
        const contentDisposition = response.headers.get('content-disposition');

        return contentDisposition
            .split(';')[1]
            .split('filename')[1]
            .split('=')[1]
            .trim()
            .match(/"([^"]+)"/)[1];
    }
}

@Injectable({ providedIn: 'root' })
export class KnwuWedstrijdResolver implements Resolve<IKnwuWedstrijd> {
    static routeId = 'wedstrijdId';
    static routeDataKey = 'wedstrijd';

    private service = inject(KnwuWedstrijdService);

    resolve(route: ActivatedRouteSnapshot): Observable<IKnwuWedstrijd> {
        return this.service.get(Guid.parse(route.paramMap.get(KnwuWedstrijdResolver.routeId)));
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
    private deelnemerService = inject(KnwuWedstrijdSDeelnemerService);

    wedstrijd: IKnwuWedstrijd = inject(ActivatedRoute).snapshot.data[KnwuWedstrijdResolver.routeDataKey];
    selectedCategorie: IKnwuWedstrijdCategorie = this.wedstrijd.categorieen.length === 1 ? this.wedstrijd.categorieen[0] : null;
    deelnemerForm = this.createDeelnemerForm();
    deelnemer: IKnwuWedstrijdDeelnemer;

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

    aanmelden(stepper: MatStepper): void {
        if (!this.deelnemerForm.valid || !this.selectedCategorie)
            return this.deelnemerForm.markAllAsTouched();

        this.service
            .aanmelden(this.wedstrijd.id, this.selectedCategorie.id, this.deelnemerForm.value)
            .pipe(tap(deelnemer => this.deelnemer = deelnemer))
            .subscribe(_ => stepper.next());
    }

    updateNummer(): void {
        this.deelnemerService
            .updateStartnummer(this.deelnemer.id)
            .subscribe(deelnemer => this.deelnemer = deelnemer);
    }

    private createDeelnemerForm(): FormGroup {
        return this.formBuilder
            .group({
                knwuId: [null, CustomValidators.conditional(form => !form.controls.uciId.value, Validators.required, Validators.minLength(8))],
                uciId: [null, CustomValidators.conditional(form => !form.controls.knwuId.value, Validators.required, Validators.minLength(11))]
            })
            .withMonitoring();
    }
}

export class CustomValidators {
    static conditional(predicate: (form: FormGroup) => boolean, ...validators: ValidatorFn[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const formGroup = control.parent;

            if (!(formGroup instanceof FormGroup))
                return null;

            if (!predicate(formGroup))
                return null;

            return validators.reduce((errors, validator) => {
                const result = validator(control);
                return result ? { ...errors, ...result } : errors;
            }, {} as ValidationErrors);
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