import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { bootstrapApplication } from '@angular/platform-browser';
import { ClubComponent } from './club/club';
import { ClubConfigService } from './club/shared/config/config.service';

registerLocaleData(localeNl, 'nl-NL');

bootstrapApplication(ClubComponent, ClubConfigService.applicationConfig)
    .catch((err) => console.error(err));
