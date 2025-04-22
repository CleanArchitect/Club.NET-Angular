using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data;

internal sealed class EvenementEntityTypeConfiguration : IEntityTypeConfiguration<Evenement>
{
    public void Configure(EntityTypeBuilder<Evenement> builder)
    {
        builder.ToTable("evenement");
    }
}
