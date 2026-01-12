import { KeyOf } from "../../../types/key-of";
import { CleanFormFieldDatepickerComponent } from "../../components/date/date";
import { CleanFormField, CleanFormFieldOptions } from "./field";

export const date = <TModel>(key: KeyOf<TModel, Date | string>, label: string, options?: Partial<Pick<CleanFormFieldDate<any>, 'maxYear' | 'minYear' | CleanFormFieldOptions>>): CleanFormFieldDate<TModel> =>
    new CleanFormFieldDate(key, label, options);

export class CleanFormFieldDate<TModel = any, TValue = Date | string> extends CleanFormField<TModel, TValue> {
    maxYear: number;
    minYear: number;

    constructor(
        key: KeyOf<TModel, TValue>,
        label: string,
        options?: Partial<CleanFormFieldDate>
    ) {
        super(key, label, CleanFormFieldDatepickerComponent, options);
    }
}