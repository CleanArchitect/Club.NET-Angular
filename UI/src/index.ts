import { bootstrapApplication } from '@angular/platform-browser';
import { ClubComponent } from './club/club';
import { ClubConfigService } from './club/shared/config/config.service';

bootstrapApplication(ClubComponent, ClubConfigService.applicationConfig)
    .catch((err) => console.error(err));
