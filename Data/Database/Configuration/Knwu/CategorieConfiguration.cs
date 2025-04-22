using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data;

internal sealed class KnwuWedstrijdCategorieEntityTypeConfiguration : IEntityTypeConfiguration<KnwuWedstrijdCategorie>
{
    public void Configure(EntityTypeBuilder<KnwuWedstrijdCategorie> builder)
    {
        builder.ToTable("wedstrijd_categorie", ClubDbContext.KnwuSchema);

        builder
            .Property(categorie => categorie.Startnummers)
            .HasShortListConversion();
    }
}