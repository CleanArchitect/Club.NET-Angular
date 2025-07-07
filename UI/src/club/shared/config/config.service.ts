import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, EnvironmentProviders, Injectable, inject, makeEnvironmentProviders, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { provideRouter } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { routes } from '../../club.routes';
import { CONFIG, IConfig } from './config';

@Injectable({ providedIn: 'root' })
export class ClubConfigService {
    private http = inject(HttpClient);

    config: IConfig;

    async initialize(): Promise<void> {
        await firstValueFrom(this.http.get<IConfig>('/config.json'))
            .then(config => this.config = config);
    }

    static applicationConfig: ApplicationConfig = {
        providers: [
            provideZoneChangeDetection({ eventCoalescing: true }),
            provideRouter(routes),
            provideHttpClient(),
            provideNativeDateAdapter(),
            provideAppInitializer(async () => await inject(ClubConfigService).initialize()),
            provideAppInitializer(() => { inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-outlined'); }),
            ClubConfigService.provideConfig()
        ]
    };

    static provideConfig(): EnvironmentProviders {
        return makeEnvironmentProviders([{
            provide: CONFIG,
            useFactory: () => inject(ClubConfigService).config
        }]);
    }
}