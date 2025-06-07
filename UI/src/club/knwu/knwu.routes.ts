import { Routes } from '@angular/router';
import { KnwuWedstrijdAanmeldenComponent, KnwuWedstrijdResolver } from './wedstrijd/aanmelden/aanmelden';
import { KnwuWedstrijdDeelnemerComponent, KnwuWedstrijdDeelnemerResolver } from './wedstrijd/deelnemer/deelnemer';
import { KnwuWedstrijdOverzichtComponent } from './wedstrijd/overzicht/overzicht';

export const knwuRoutes: Routes = [
    { path: 'knwu/wedstrijd/overzicht', component: KnwuWedstrijdOverzichtComponent },
    { path: `knwu/wedstrijd/:${KnwuWedstrijdResolver.routeId}/aanmelden`, component: KnwuWedstrijdAanmeldenComponent, resolve: { [KnwuWedstrijdResolver.routeDataKey]: KnwuWedstrijdResolver } },
    { path: `knwu/wedstrijd/deelnemer/:${KnwuWedstrijdDeelnemerResolver.routeId}`, component: KnwuWedstrijdDeelnemerComponent, resolve: { [KnwuWedstrijdDeelnemerResolver.routeDataKey]: KnwuWedstrijdDeelnemerResolver }}
];