import { Guid } from 'guid-typescript';

export interface IKnwuLid {
    knwuId: string;
    uciId: string;
}

export interface IKnwuWedstrijdCategorie {
    id: Guid;
    naam: string;
}

export interface IKnwuWedstrijd {
    id: Guid;
    naam: string;
    datum: Date;
    categorieen: IKnwuWedstrijdCategorie[];
}

export interface IKnwuWedstrijdDeelnemer extends IKnwuLid {
    id: Guid;
    categorieId: Guid;
    startnummer?: number;
}