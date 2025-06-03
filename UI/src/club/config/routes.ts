import { Routes } from '@angular/router';
import { KnwuWedstrijdAanmeldenComponent, KnwuWedstrijdResolver } from '../knwu/wedstrijd/aanmelden/aanmelden';
import { KnwuWedstrijdOverzichtComponent } from '../knwu/wedstrijd/overzicht/overzicht';

export const routes: Routes = [
    {
        path: '', redirectTo: 'knwu/wedstrijd/overzicht', pathMatch: 'full'
    },
    {
        path: 'knwu/wedstrijd/overzicht',  component: KnwuWedstrijdOverzichtComponent
    },
    { 
        path: `knwu/wedstrijd/aanmelden/:${KnwuWedstrijdResolver.wedstrijdId}`, 
        component: KnwuWedstrijdAanmeldenComponent, 
        resolve: { [KnwuWedstrijdResolver.wedstrijd]: KnwuWedstrijdResolver } 
    }
];
