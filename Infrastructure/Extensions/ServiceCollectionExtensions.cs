﻿using Clean.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DataServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString, bool enableErrorDetails) =>
        services
            .AddCleanInfrastructure<ClubDbContext>(options => options
                .EnableDetailedErrors(enableErrorDetails)
                .UseLazyLoadingProxies()
                .UseSnakeCaseNamingConvention()
                .UseNpgsql(connectionString, options =>
                    options.MigrationsHistoryTable(ClubDbContext.MigrationsTable)));
}