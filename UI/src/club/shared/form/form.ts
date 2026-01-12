import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CleanFormFieldDirective } from './directives/field.directive';
import { CleanForm } from './models/form';

@Component({
    selector: 'clean-form[form]',
    templateUrl: 'form.html',
    styleUrl: 'form.scss',
    imports: [CommonModule, ReactiveFormsModule, CleanFormFieldDirective]
})
export class CleanFormComponent<TModel = any> {
    @Input() form: CleanForm<TModel>;
}
