import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CleanBooleanTextIntl implements ICleanBooleanPipeConfig {
    trueValue = 'Yes';
    falseValue = 'No';
}

export interface ICleanBooleanPipeConfig {
    trueValue: string;
    falseValue: string;
    nullValue?: string;
    undefinedValue?: string;
}

@Pipe({ name: 'cleanBoolean' })
export class CleanBooleanPipe implements PipeTransform {
    transform(value: boolean, config: ICleanBooleanPipeConfig, emptyPlaceholder: string = '-'): string {
        switch (value) {
            case true: return config.trueValue;
            case false: return config.falseValue;
            case undefined: return emptyPlaceholder ?? config.undefinedValue;
            case null: return emptyPlaceholder ?? config.nullValue;
        }
    }
}