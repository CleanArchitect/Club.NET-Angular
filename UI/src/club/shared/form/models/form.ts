import { FormControl, FormGroup } from '@angular/forms';
import { CleanFormColumn } from './column';

export class CleanForm<TModel = unknown> extends FormGroup {
    private previousModel: TModel;

    columns: CleanFormColumn<TModel>[];

    declare value: TModel;

    constructor(public model: TModel, ...columns: CleanFormColumn<TModel>[]) {
        super(CleanForm.createControls(model, columns));

        this.columns = columns;
    }

    override reset(): void {
        this.columns
            .forEach(column => column.fields
                .forEach(field => field.reset(this.model)));
    }

    validate(): void {
        this.markAllAsTouched();
    }

    save(): TModel {
        return this
            .savePreviousModel()
            .updateModel();
    }

    undo(): void {
        return this
            .setPreviousModel()
            .reset();
    }

    private setPreviousModel(): this {
        this.model = this.previousModel;
        return this;
    }

    private savePreviousModel(): this {
        this.previousModel = Object.assign({}, this.model);
        return this;
    }

    private updateModel(): TModel {
        Object.assign(this.model, this.value);
        return this.model;
    }

    private static createControls<TFormModel>(model: TFormModel, columns: CleanFormColumn<TFormModel>[]): Record<string, FormControl> {
        return Object.fromEntries(columns
            .flatMap(column => column.fields
                .map(field => [field.key, field.createFormControl(model)])));
    }
}
