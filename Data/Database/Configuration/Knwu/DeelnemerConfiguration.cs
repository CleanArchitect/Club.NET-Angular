using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data;

internal sealed class KnwuWedstrijdDeelnemerEntityTypeConfiguration : IEntityTypeConfiguration<KnwuWedstrijdDeelnemer>
{
    public void Configure(EntityTypeBuilder<KnwuWedstrijdDeelnemer> builder)
    {
        builder.ToTable("wedstrijd_deelnemer", ClubDbContext.KnwuSchema);
    }
}