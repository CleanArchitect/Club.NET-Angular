using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure;

internal sealed class KnwuWedstrijdDeelnemerEntityTypeConfiguration : IEntityTypeConfiguration<KnwuWedstrijdCategorieDeelnemer>
{
    public void Configure(EntityTypeBuilder<KnwuWedstrijdCategorieDeelnemer> builder)
    {
        builder.ToTable("wedstrijd_categorie_deelnemer", ClubDbContext.KnwuSchema);
    }
}