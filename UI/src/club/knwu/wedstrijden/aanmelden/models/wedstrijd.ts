import { Guid } from 'guid-typescript';

export interface IKnwuLid {
    knwuId: string;
    uciId: string;
}

export interface IKnwuWedstrijdDeelnemer extends IKnwuLid {
    id: Guid;
    categorieId: Guid;
    startnummer?: number;
}