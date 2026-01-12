import { CleanFormField } from "./fields/field";

export const column = <TModel>(...fields: [CleanFormField<TModel> | CleanFormField<TModel>[], ...(CleanFormField<TModel> | CleanFormField<TModel>[])[]]): CleanFormColumn<TModel> =>
    new CleanFormColumn(...fields);

export class CleanFormColumn<TModel> {
    rows: CleanFormField<TModel>[][];

    get fields(): CleanFormField<TModel>[] { 
        return this.rows.flat(); 
    }

    constructor(...fields: (CleanFormField<TModel> | CleanFormField<TModel>[])[]) {
        this.rows = fields.map(field => Array.isArray(field) ? field : [field]);
    }
}