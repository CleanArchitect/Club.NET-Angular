import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, EnvironmentProviders, inject, Injectable, InjectionToken, makeEnvironmentProviders, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { routes } from './club.routes';

export interface IConfig {
    api: string;
}

export const CONFIG = new InjectionToken<IConfig>('CONFIG');

function provideConfig(): EnvironmentProviders {
    return makeEnvironmentProviders([{
        provide: CONFIG,
        useFactory: () => inject(ConfigService).config
    }]);
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private http = inject(HttpClient)
    config: IConfig;

    async initialize(): Promise<void> {
        await firstValueFrom(this.http.get<IConfig>('/config.json'))
            .then(config => this.config = config);
    }
}

export const clubConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideAppInitializer(async () => await inject(ConfigService).initialize()),
        provideConfig()
    ]
};
