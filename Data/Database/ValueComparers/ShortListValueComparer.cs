using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;

namespace Data;

public class ShortListValueComparer : ValueComparer<IEnumerable<short>>
{
    private static readonly Expression<Func<IEnumerable<short>, IEnumerable<short>, bool>> equalsExpression =
        (originalList, currentList) => originalList.SequenceEqual(currentList);

    private static readonly Expression<Func<IEnumerable<short>, int>> hashCodeExpression =
        collection => collection.Aggregate(0, (hashCode, item) => HashCode.Combine(hashCode, item));

    private static readonly Expression<Func<IEnumerable<short>, IEnumerable<short>>> snapshotExpression =
        collection => new List<short>(collection).AsReadOnly();

    public ShortListValueComparer() : base(equalsExpression, hashCodeExpression, snapshotExpression) { }
}