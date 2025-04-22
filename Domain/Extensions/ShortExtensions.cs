namespace Domain;

internal static class ShortExtensions
{
    public static IEnumerable<short> ToRange(this short start, short end)
    {
        for (short number = start; number <= end; number++)
        {
            yield return number;
        }
    }
}
