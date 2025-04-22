using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data;

public static class PropertyBuilderExtensions
{
    public static PropertyBuilder<IReadOnlyCollection<short>> HasShortListConversion(this PropertyBuilder<IReadOnlyCollection<short>> property) =>
        property
            .HasConversion(
                entityValue => entityValue.ToArray(),
                databaseValue => databaseValue.ToList(),
                new ShortListValueComparer());
}