import { Routes } from '@angular/router';
import { KnwuWedstrijdAanmelder } from './wedstrijden/aanmelden/aanmelden';
import { KnwuWedstrijdAdministratie } from './wedstrijden/administratie/administratie';

export const knwuRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'knwu/aanmelden'},
    { path: 'knwu/aanmelden', component: KnwuWedstrijdAanmelder },
    { path: 'knwu/administratie', component: KnwuWedstrijdAdministratie }
];