import { Routes } from '@angular/router';
import { KnwuWedstrijdAanmelder } from './wedstrijden/aanmelden/aanmelden';

export const knwuRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'knwu/aanmelden'},
    { path: 'knwu/aanmelden', component: KnwuWedstrijdAanmelder }
];