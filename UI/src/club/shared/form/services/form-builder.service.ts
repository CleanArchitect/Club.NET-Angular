import { Injectable } from "@angular/core";
import { CleanFormColumn, column } from "../models/column";
import { CleanFormField } from "../models/fields/field";
import { CleanForm } from "../models/form";

@Injectable({ providedIn: 'root' })
export class CleanFormBuilder {
    columns<TModel>(model: TModel, ...columns: [CleanFormColumn<TModel>, ...CleanFormColumn<TModel>[]]): CleanForm<TModel> {
        return new CleanForm(model, ...columns);
    }

    fields<TModel>(model: TModel, ...fields: [CleanFormField<TModel> | CleanFormField<TModel>[], ...(CleanFormField<TModel> | CleanFormField<TModel>[])[]]): CleanForm<TModel> {
        return new CleanForm(model, column(...fields));
    }
}