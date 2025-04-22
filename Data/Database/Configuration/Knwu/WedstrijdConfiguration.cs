using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data;

internal sealed class KnwuWedstrijdEntityTypeConfiguration : IEntityTypeConfiguration<KnwuWedstrijd>
{
    public void Configure(EntityTypeBuilder<KnwuWedstrijd> builder)
    {
        builder.ToTable("wedstrijd", ClubDbContext.KnwuSchema);

        builder
            .Property(wedstrijd => wedstrijd.Bedrag)
            .HasPrecision(5, 2);

        builder
            .HasMany(wedstrijd => wedstrijd.Categorieen)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasMany(wedstrijd => wedstrijd.Deelnemers)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
    }
}