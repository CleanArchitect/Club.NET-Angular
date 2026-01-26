import { Directive, HostBinding, Input } from "@angular/core";
import { CleanFormField } from "../models/fields/field";
import { CleanFormWidth } from "../types/field-width";

@Directive()
export abstract class CleanFormFieldComponent<TField extends CleanFormField> {
    @Input({ required: true }) field!: TField;
    @Input({ required: true }) model!: unknown;

    private flexWidths: Record<CleanFormWidth, number> = {
        'quarter': 0.25,
        'half': 0.5,
        'three-quarter': 0.75,
        'full': 1
    }

    @HostBinding('style.flex') get flex() { return this.flexWidths[this.field.width] ?? 1; }
}