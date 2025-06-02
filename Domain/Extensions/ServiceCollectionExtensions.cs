using Clean.Net;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Domain;

public static class DomainServiceCollectionExtensions
{
    public static IServiceCollection AddDomain(this IServiceCollection services) =>
        services
            .AddCleanDomain()
            .AddServiceImplementations(typeof(IValidator));
}