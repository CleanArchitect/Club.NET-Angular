﻿namespace Domain;

public sealed class KnwuWedstrijdDeelnemerExcelModel
{
    public short Nummer { get; init; }
    public int? KnwuId { get; init; }
    public long? UciId { get; init; }

    internal KnwuWedstrijdDeelnemerExcelModel(KnwuWedstrijdCategorieDeelnemer deelnemer)
    {
        Nummer = deelnemer.Startnummer;
        KnwuId = int.TryParse(deelnemer.KnwuId, out int knwuId) ? knwuId : null;
        UciId = long.TryParse(deelnemer.UciId, out long icuId) ? icuId : null;
    }

    internal static KnwuWedstrijdDeelnemerExcelModel Create(KnwuWedstrijdCategorieDeelnemer deelnemer) =>
        deelnemer == null ? null : new(deelnemer);
}
