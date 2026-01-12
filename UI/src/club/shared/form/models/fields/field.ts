import { ComponentType } from '@angular/cdk/portal';
import { AsyncValidatorFn, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { KeysOf } from '../../../table';
import { KeyOf } from '../../../types/key-of';
import { CleanFormFieldComponent } from '../../components/field.component';

export type CleanFormFieldOptions = KeysOf<CleanFormField, 'hint' | 'tooltip' | 'validators' | 'asyncValidators' | 'formFieldOptions' | 'disabled' | 'value' | 'valueChanges'>;

export const group = <TModel>(...fields: [CleanFormField<TModel>, CleanFormField<TModel>, ...CleanFormField<TModel>[]]): CleanFormField<TModel>[] =>
    fields;

export abstract class CleanFormField<TModel = any, TValue = any> {
    private control: FormControl;

    hint: string;
    tooltip: string;
    validators: ValidatorFn | ValidatorFn[];
    asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];
    formFieldOptions: MatFormFieldDefaultOptions;
    disabled: boolean;    

    get formControl(): FormControl { return this.control; }
    get required(): boolean { return this.control?.hasValidator(Validators.required); }

    constructor(
        public key: KeyOf<TModel, TValue>,
        public label: string,
        public component: ComponentType<CleanFormFieldComponent<CleanFormField>>,
        options?: Partial<CleanFormField>
    ) {
        Object.assign(this, options);
    }

    value: (value: TValue) => string = value => value?.toString();
    valueChanges: (value: TValue) => void;

    createFormControl(model: TModel): FormControl {
        this.control = new FormControl({ value: model[this.key], disabled: this.disabled }, this.validators, this.asyncValidators);
        this.control.valueChanges.subscribe(value => this.valueChanges?.(value));
        return this.control;
    }

    reset(model: TModel): this {
        this.control.setValue(model[this.key], { emitEvent: false });
        return this;
    }
}
