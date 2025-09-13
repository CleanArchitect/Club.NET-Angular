import { Guid } from 'guid-typescript';
import { IKnwuWedstrijdDeelnemer } from '../aanmelden/models/wedstrijd';

export interface IKnwuWedstrijdCategorieCreate {
    naam: string;
    startnummerBegin: number;
    startnummerEind: number;
}

export interface IKnwuWedstrijdCategorie {
    id: Guid;
    naam: string;
    deelnemers: IKnwuWedstrijdDeelnemer[];
}

export interface IKnwuWedstrijd {
    id: Guid;
    knwuWedstrijdnummer: string;
    naam: string;
    datum: Date;
    categorieen: IKnwuWedstrijdCategorie[];
}

export interface IKnwuWedstrijdCreate {
    knwuWedstrijdnummer: string;
    naam: string;
    datum: Date;
    categorieen: IKnwuWedstrijdCategorieCreate[];
}