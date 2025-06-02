using Clean.Net;
using Microsoft.AspNetCore.Routing;

namespace Application;

internal class KebabCaseOutboundParameterTransformer : IOutboundParameterTransformer
{
    public string TransformOutbound(object value) =>
        value?
            .ToString()
            .ToLowerInvariant()
            .ToKebabCase('/');
}