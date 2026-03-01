import { KeyOf } from "../../../types/key-of";
import { CleanFormFieldTextComponent } from "../../components/text/text";
import { CleanFormField, CleanFormFieldOptions } from "./field";

export const textField = <TModel>(key: KeyOf<TModel, string | number>, label: string, options?: Partial<Pick<CleanFormFieldText<TModel>, 'maxLength' | 'type' | CleanFormFieldOptions>>): CleanFormFieldText<TModel> =>
    new CleanFormFieldText(key, label, options);

export class CleanFormFieldText<TModel = unknown, TValue = string | number> extends CleanFormField<TModel, TValue> {
    maxLength: string;
    type: 'text' | 'search' | 'url' | 'tel' | 'email' | 'number' | 'textarea' = 'text';

    constructor(
        key: KeyOf<TModel, TValue>,
        label: string,
        options?: Partial<CleanFormFieldText>
    ) {
        super(key, label, CleanFormFieldTextComponent, options);

        Object.assign(this, options);
    }
}
