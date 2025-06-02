using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure;

internal sealed class KnwuWedstrijdCategorieEntityTypeConfiguration : IEntityTypeConfiguration<KnwuWedstrijdCategorie>
{
    public void Configure(EntityTypeBuilder<KnwuWedstrijdCategorie> builder)
    {
        builder.ToTable("wedstrijd_categorie", ClubDbContext.KnwuSchema);

        builder
            .Property(categorie => categorie.Bedrag)
            .HasPrecision(5, 2);

        builder
            .Property(categorie => categorie.Startnummers)
            .HasShortListConversion();

        builder
            .HasMany(categorie => categorie.Deelnemers)
            .WithOne(deelnemer => deelnemer.Categorie)
            .OnDelete(DeleteBehavior.Cascade);
    }
}