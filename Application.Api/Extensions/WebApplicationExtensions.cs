using Clean.Net;
using Data;
using Domain;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Application.Api;

internal static class WebApplicationExtensions
{
    public static WebApplication Configure(this WebApplicationBuilder builder)
    {
        var appSettings = builder.Configuration.GetAppSettings<AppSettings>();

        builder.Services
            .AddControllers(options => options.Conventions.Add(new RouteTokenTransformerConvention(new KebabCaseOutboundParameterTransformer())));

        builder.Services
            .AddData(appSettings.Connectionstring, builder.Environment.IsProduction())
            .AddDomain();

        builder.Services
            .AddCorsPolicies(appSettings.CorsConfiguration)
            .AddSwaggerGen();
        //.AddFluentValidationAutoValidation();

        return builder
            .Build()
            .UseServices(appSettings);
    }

    private static WebApplication UseServices(this WebApplication app, AppSettings appsettings)
    {
        app
            .UseCors(appsettings.DefaultPolicyName)
            .UseSwagger()
            .UseSwaggerUI()
            .UseDeveloperExceptionPage();

        app.MapControllers();

        return app;
    }
}
