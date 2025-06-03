import { bootstrapApplication } from '@angular/platform-browser';
import { ClubComponent } from './club/club';
import { clubConfig } from './club/config/config';

bootstrapApplication(ClubComponent, clubConfig)
    .catch((err) => console.error(err));
