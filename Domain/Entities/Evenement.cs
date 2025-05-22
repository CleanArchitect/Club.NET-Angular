using Clean.Net;

namespace Domain;

internal abstract class Evenement : Entity
{
    public DateOnly Datum { get; private set; }
}
