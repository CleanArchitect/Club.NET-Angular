import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CleanFormFieldText } from "../../models/fields/text";
import { CleanFormFieldComponent } from "../field.component";

@Component({
    selector: 'clean-form-field-text',
    templateUrl: 'text.html',
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule]
})
export class CleanFormFieldTextComponent extends CleanFormFieldComponent<CleanFormFieldText> {}