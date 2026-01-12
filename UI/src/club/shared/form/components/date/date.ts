import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CleanFormFieldDate } from "../../models/fields/date";
import { CleanFormFieldComponent } from "../field.component";

@Component({
    selector: 'clean-form-field-datepicker',
    templateUrl: 'date.html',
    imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatInputModule]
})
export class CleanFormFieldDatepickerComponent extends CleanFormFieldComponent<CleanFormFieldDate> { }