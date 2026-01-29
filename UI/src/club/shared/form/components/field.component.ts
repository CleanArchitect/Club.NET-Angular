import { Directive, HostBinding, Input } from "@angular/core";
import { CleanFormField } from "../models/fields/field";

@Directive()
export abstract class CleanFormFieldComponent<TField extends CleanFormField> {
    @Input({ required: true }) field!: TField;
    @Input({ required: true }) model!: unknown;


    @HostBinding('style.flex') get flex() { return this.field.width || 1; }
}