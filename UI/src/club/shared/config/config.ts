import { InjectionToken } from '@angular/core';

export interface IConfig {
    api: string;
}

export const CONFIG = new InjectionToken<IConfig>('CONFIG');
