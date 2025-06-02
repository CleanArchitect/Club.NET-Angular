using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure;

internal sealed class KnwuWedstrijdEntityTypeConfiguration : IEntityTypeConfiguration<KnwuWedstrijd>
{
    public void Configure(EntityTypeBuilder<KnwuWedstrijd> builder)
    {
        builder.ToTable("wedstrijd", ClubDbContext.KnwuSchema);

        builder
            .HasMany(wedstrijd => wedstrijd.Categorieen)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
    }
}