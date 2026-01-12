import { Directive, EnvironmentInjector, inject, Input, OnInit, ViewContainerRef } from "@angular/core";
import { CleanFormField } from "../models/fields/field";

@Directive({ selector: '[cleanFormField]' })
export class CleanFormFieldDirective implements OnInit {
    private viewContainerRef = inject(ViewContainerRef);
    private envInjector = inject(EnvironmentInjector);

    @Input({ required: true }) cleanFormField: { model: any, field: CleanFormField<any> };

    ngOnInit(): void {
        const component = this.viewContainerRef.createComponent(this.cleanFormField.field.component, { environmentInjector: this.envInjector });
        component.instance.field = this.cleanFormField.field;
        component.instance.model = this.cleanFormField.model;
    }
}